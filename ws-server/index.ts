import 'dotenv/config';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { createClerkClient, verifyToken } from '@clerk/backend';
import crypto from 'crypto';

const clerkClient = createClerkClient({
	secretKey: process.env.CLERK_SECRET_KEY!,
});

const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: process.env.CLIENT_URL,
		methods: ['GET', 'POST'],
	},
});

// ---------- Types ----------

interface AuthedSocket extends Socket {
	userId?: string;
	currentRoom?: string;
}

type Role = 'host' | 'member';
type RoomStatus = 'OPEN' | 'PLAYING';

interface RoomMember {
	socket: AuthedSocket;
	userId: string;
	name: string;
	role: Role;
}

interface RoomSettings {
	imposter_amount: number;
	hints: boolean;
	categories: string[];
}

interface ChatMessage {
	from: string;
	fromId: string;
	text: string;
	timestamp: number;
}

interface TurnOrderData {
	order: string[];
	currentIndex: number;
}

interface RoundWordEntry {
	userId: string;
	name: string;
	word: string;
}

interface RoundWords {
	round: number;
	words: RoundWordEntry[];
}

// ---------- State ----------
// Keyed by roomCode. Each room's members map is keyed by Clerk userId.

const rooms = new Map<string, Map<string, RoomMember>>();
const roomChats = new Map<string, ChatMessage[]>();
const roomSettings = new Map<string, RoomSettings>();
const roomStatus = new Map<string, RoomStatus>();
const roomTurnOrder = new Map<string, TurnOrderData>();
const roomWords = new Map<string, RoundWords[]>();
const roomVotes = new Map<string, Record<string, string>>();
const roomEliminated = new Map<string, Set<string>>();
const roomRound = new Map<string, number>();
const roomImposters = new Map<string, Set<string>>();
const roomVoteTimers = new Map<string, NodeJS.Timeout>();

const VOTE_DURATION = 30000;

// ---------- Helpers ----------

async function fetchWordFromAI(
	categories: string[],
): Promise<{ category: string; word: string; hint: string }> {
	const categoryLabels: Record<string, string> = {
		animals: 'Animals',
		food_drinks: 'Food & Drinks',
		countries: 'Countries',
		professions: 'Professions',
		sports: 'Sports',
		household_items: 'Household Items',
		clothing_accessories: 'Clothing & Accessories',
		vehicles_transport: 'Vehicles & Transport',
		school_office: 'School & Office',
		nature_weather: 'Nature & Weather',
	};

	const categoryList = categories
		.map((c) => categoryLabels[c] ?? c)
		.join(', ');

	const res = await fetch(`${process.env.CLIENT_URL}/api/ai`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			prompt: `Act as a game content generator for a hidden-role "imposter" party game.
            Game Context:
            In this game, civilian players are given a specific target word, while the imposter is only given a highly generalized hint. Players take turns saying a single associated word to prove they are civilians. The imposter uses the hint to try and blend in.

            Your Task:
            Randomly select one category from the provided list, generate a target word that fits that category, and create a very vague, generalized hint for that word. The hint MUST NOT describe the word directly. Instead, it should describe a broad overarching concept, an abstract feeling, or a high-level classification.

            Categories:
            [${categoryList}]

            Hint Examples (Strict Guide):
            Word: "Soccer" | BAD Hint: "Team sport played on a field" | GOOD Hint: "Requires physical energy" or "Group activity"
            Word: "Apple" | BAD Hint: "A round fruit" | GOOD Hint: "Found in nature" or "Consumable"
            Word: "Teacher" | BAD Hint: "Works in a school" | GOOD Hint: "Authority figure" or "Involves communication"

            Strict Rules:
            The target word MUST be a single word or a hyphenated word. Absolutely no spaces.
            The hint must be cryptic and abstract. Never describe shape, color, or exact function.
            Format output as a single minified JSON line with no newline characters.

            Output Format:
            Return ONLY valid JSON, no extra text or markdown.
            {"category": "The chosen category", "word": "The target word", "hint": "The vague hint"}`,
		}),
	});

	if (!res.ok) throw new Error(`AI API responded with status ${res.status}`);

	const data = await res.json();
	if (!data.output?.word || !data.output?.category || !data.output?.hint) {
		throw new Error('Invalid AI response shape');
	}

	return data.output;
}

function generateRoomCode(): string {
	return crypto.randomBytes(3).toString('hex').toUpperCase();
}

function log(label: string, data?: unknown) {
	const time = new Date().toLocaleTimeString();
	console.log(`[${time}] [${label}]`, data ?? '');
}

function getRoomMembers(roomCode: string) {
	const room = rooms.get(roomCode);
	if (!room) return [];
	return [...room.values()].map(({ userId, name, role }) => ({
		id: userId,
		name,
		role,
	}));
}

function broadcastMembersUpdate(roomCode: string) {
	const members = getRoomMembers(roomCode);
	log(
		'MEMBERS UPDATE',
		`Room ${roomCode}: ${members.map((m) => `${m.name} (${m.role})`).join(', ')}`,
	);
	io.to(roomCode).emit('members_update', { members });

	const room = rooms.get(roomCode);
	if (!room) return;
	for (const { socket, role } of room.values()) {
		socket.emit('role_update', { role });
	}
}

function clearRoomState(roomCode: string) {
	roomChats.delete(roomCode);
	roomSettings.delete(roomCode);
	roomStatus.delete(roomCode);
	roomTurnOrder.delete(roomCode);
	roomWords.delete(roomCode);
	roomVotes.delete(roomCode);
	roomEliminated.delete(roomCode);
	roomRound.delete(roomCode);
	roomImposters.delete(roomCode);
	const timer = roomVoteTimers.get(roomCode);
	if (timer) clearTimeout(timer);
	roomVoteTimers.delete(roomCode);
}

function removeFromRoom(userId: string, roomCode: string) {
	const room = rooms.get(roomCode);
	if (!room) return;

	room.delete(userId);
	log('ROOM LEAVE', `User "${userId}" left room ${roomCode}`);

	if (room.size === 0) {
		rooms.delete(roomCode);
		clearRoomState(roomCode);
		log('ROOM DELETE', `Room ${roomCode} is empty, removed`);
		return;
	}

	const hasHost = [...room.values()].some((m) => m.role === 'host');
	if (!hasHost) {
		const [, newHost] = [...room.entries()][0];
		newHost.role = 'host';
		log(
			'HOST TRANSFER',
			`New host is "${newHost.name}" in room ${roomCode}`,
		);
	}

	broadcastMembersUpdate(roomCode);

	const turnData = roomTurnOrder.get(roomCode);
	if (turnData && roomStatus.get(roomCode) === 'PLAYING') {
		const eliminated = roomEliminated.get(roomCode);
		const newOrder = turnData.order.filter(
			(id) => room.has(id) && !eliminated?.has(id),
		);
		if (newOrder.length > 0) {
			const newIndex = Math.min(
				turnData.currentIndex,
				newOrder.length - 1,
			);
			roomTurnOrder.set(roomCode, {
				order: newOrder,
				currentIndex: newIndex,
			});
			io.to(roomCode).emit('turn_update', {
				currentTurn: newOrder[newIndex],
			});
		}
	}

	if (roomStatus.get(roomCode) === 'PLAYING' && room.size <= 1) {
		stopGame(roomCode, 'Not enough players');
	}
}

function stopGame(roomCode: string, reason = 'Game stopped') {
	roomStatus.set(roomCode, 'OPEN');
	roomTurnOrder.delete(roomCode);
	roomWords.delete(roomCode);
	roomVotes.delete(roomCode);
	roomEliminated.delete(roomCode);
	roomRound.delete(roomCode);
	roomImposters.delete(roomCode);
	const timer = roomVoteTimers.get(roomCode);
	if (timer) clearTimeout(timer);
	roomVoteTimers.delete(roomCode);

	log('GAME STOP', `Room ${roomCode} — ${reason}`);
	io.to(roomCode).emit('game_over', { reason });
	io.to(roomCode).emit('room_status', { status: 'OPEN' });
}

function resolveVotes(roomCode: string) {
	const timer = roomVoteTimers.get(roomCode);
	if (timer) clearTimeout(timer);
	roomVoteTimers.delete(roomCode);

	const room = rooms.get(roomCode);
	if (!room) return;

	const votes = roomVotes.get(roomCode) ?? {};
	const eliminated = roomEliminated.get(roomCode)!;
	const imposters = roomImposters.get(roomCode)!;

	const tally: Record<string, number> = {};
	for (const targetId of Object.values(votes)) {
		tally[targetId] = (tally[targetId] ?? 0) + 1;
	}

	const maxVotes = Math.max(0, ...Object.values(tally));
	let eliminatedThisRound: string | null = null;

	if (maxVotes > 0) {
		const topTargets = Object.entries(tally).filter(
			([, v]) => v === maxVotes,
		);
		if (topTargets.length === 1) {
			eliminatedThisRound = topTargets[0][0];
			eliminated.add(eliminatedThisRound);
			log(
				'VOTE RESULT',
				`Room ${roomCode}: "${eliminatedThisRound}" eliminated`,
			);
		} else {
			log('VOTE RESULT', `Room ${roomCode}: tie — no elimination`);
		}
	} else {
		log('VOTE RESULT', `Room ${roomCode}: no votes cast — continuing`);
	}

	io.to(roomCode).emit('vote_result', {
		eliminatedId: eliminatedThisRound,
		tally,
	});

	const activePlayers = [...room.keys()].filter((id) => !eliminated.has(id));
	const activeImposters = [...imposters].filter((id) => !eliminated.has(id));

	if (activeImposters.length === 0) {
		setTimeout(() => stopGame(roomCode, 'imposters_caught'), 3000);
		return;
	}
	if (activePlayers.length <= 2) {
		setTimeout(() => stopGame(roomCode, 'imposters_win'), 3000);
		return;
	}

	setTimeout(() => startNewRound(roomCode), 3000);
}

function startNewRound(roomCode: string) {
	const room = rooms.get(roomCode);
	if (!room) return;

	const eliminated = roomEliminated.get(roomCode)!;
	const currentRound = (roomRound.get(roomCode) ?? 1) + 1;
	roomRound.set(roomCode, currentRound);
	roomVotes.set(roomCode, {});

	const words = roomWords.get(roomCode) ?? [];
	words.push({ round: currentRound, words: [] });
	roomWords.set(roomCode, words);

	const activePlayers = [...room.keys()].filter((id) => !eliminated.has(id));
	const shuffled = [...activePlayers].sort(() => Math.random() - 0.5);
	roomTurnOrder.set(roomCode, { order: shuffled, currentIndex: 0 });

	log('NEW ROUND', `Room ${roomCode} — Round ${currentRound}`);

	io.to(roomCode).emit('new_round', {
		round: currentRound,
		turnOrder: shuffled,
		currentTurn: shuffled[0],
		eliminatedIds: [...eliminated],
	});
}

// ---------- Auth middleware ----------
// Runs before every connection is accepted. Rejected sockets never reach
// the `connection` handler below, so every event handler can trust
// socket.userId is a real, verified Clerk user id.

io.use(async (socket: AuthedSocket, next) => {
	try {
		const token = socket.handshake.auth.token;
		if (!token) return next(new Error('No auth token provided'));

		const payload = await verifyToken(token, {
			secretKey: process.env.CLERK_SECRET_KEY!,
		});

		socket.userId = payload.sub;
		next();
	} catch (err) {
		console.error('Token verification failed:', err);
		next(new Error('Authentication failed'));
	}
});

// ---------- Connection & events ----------

io.on('connection', (socket: AuthedSocket) => {
	log('CONNECT', `User ${socket.userId} connected`);

	socket.on(
		'create_room',
		(
			payload: { name: string; settings?: Partial<RoomSettings> },
			callback: (res: any) => void,
		) => {
			const userId = socket.userId!;
			const name = (payload.name ?? `Player_${userId.slice(-4)}`)
				.trim()
				.slice(0, 24);

			let code = generateRoomCode();
			while (rooms.has(code)) code = generateRoomCode();

			const settings: RoomSettings = {
				imposter_amount: Math.max(
					1,
					Math.min(5, payload.settings?.imposter_amount ?? 1),
				),
				hints: payload.settings?.hints ?? true,
				categories:
					payload.settings?.categories &&
					payload.settings.categories.length > 0
						? payload.settings.categories
						: ['animals'],
			};

			rooms.set(
				code,
				new Map([[userId, { socket, userId, name, role: 'host' }]]),
			);
			roomChats.set(code, []);
			roomSettings.set(code, settings);
			roomStatus.set(code, 'OPEN');
			socket.currentRoom = code;
			socket.join(code);

			log(
				'ROOM CREATE',
				`Code: ${code} by "${name}" | settings: ${JSON.stringify(settings)}`,
			);

			callback?.({ success: true, roomCode: code, settings });
			broadcastMembersUpdate(code);
		},
	);

	socket.on(
		'join_room',
		(
			payload: { roomCode: string; name: string },
			callback: (res: any) => void,
		) => {
			const userId = socket.userId!;
			const { roomCode } = payload;
			const targetRoom = rooms.get(roomCode);

			if (!targetRoom) {
				return callback({ success: false, error: 'Room not found' });
			}

			// Already a member of this room
			const existing = targetRoom.get(userId);
			if (existing) {
				existing.socket = socket;
				socket.currentRoom = roomCode;
				socket.join(roomCode);

				callback({
					success: true,
					roomCode,
					settings: roomSettings.get(roomCode),
					status: roomStatus.get(roomCode) ?? 'OPEN',
				});
				socket.emit('chat_history', {
					messages: roomChats.get(roomCode) ?? [],
				});
				broadcastMembersUpdate(roomCode);
				return;
			}

			// New joiner
			if (roomStatus.get(roomCode) === 'PLAYING') {
				return callback({
					success: false,
					error: 'Game is in progress, please wait until the round is over',
				});
			}

			if (socket.currentRoom && rooms.has(socket.currentRoom)) {
				removeFromRoom(userId, socket.currentRoom);
				socket.leave(socket.currentRoom);
			}

			const name = (payload.name ?? `Player_${userId.slice(-4)}`)
				.trim()
				.slice(0, 24);
			targetRoom.set(userId, { socket, userId, name, role: 'member' });
			socket.currentRoom = roomCode;
			socket.join(roomCode);

			callback({
				success: true,
				roomCode,
				settings: roomSettings.get(roomCode),
				status: roomStatus.get(roomCode) ?? 'OPEN',
			});
			socket.emit('chat_history', {
				messages: roomChats.get(roomCode) ?? [],
			});
			broadcastMembersUpdate(roomCode);
		},
	);

	socket.on('start_game', async (callback: (res: any) => void) => {
		const roomCode = socket.currentRoom;
		if (!roomCode)
			return callback?.({ success: false, error: 'Not in a room' });

		const room = rooms.get(roomCode);
		const requester = room?.get(socket.userId!);

		if (!requester || requester.role !== 'host') {
			callback?.({
				success: false,
				error: 'Only the host can start the game',
			});
			return;
		}

		const settings = roomSettings.get(roomCode);
		if (!settings || !room) return;

		const memberList = [...room.entries()];
		if (memberList.length < 2) {
			callback?.({
				success: false,
				error: 'Need at least 2 players to start',
			});
			return;
		}

		const imposterCount = Math.min(
			settings.imposter_amount,
			memberList.length - 1,
		);

		// Shuffle and assign imposters before the async call so
		// room state doesn't drift while we await the AI
		const shuffled = [...memberList].sort(() => Math.random() - 0.5);
		const imposterIds = new Set(
			shuffled.slice(0, imposterCount).map(([id]) => id),
		);

		let picked: { category: string; word: string; hint: string };
		try {
			picked = await fetchWordFromAI(settings.categories);
		} catch (err) {
			log('AI ERROR', (err as Error).message);
			callback?.({
				success: false,
				error: 'Failed to generate word, please try again',
			});
			return;
		}

		// Re-check room still exists after async gap
		if (!rooms.has(roomCode)) return;

		log(
			'GAME START',
			`Room ${roomCode} | Word: "${picked.word}" | Category: "${picked.category}" | Imposters: ${imposterCount}`,
		);

		roomStatus.set(roomCode, 'PLAYING');
		roomRound.set(roomCode, 1);
		roomWords.set(roomCode, [{ round: 1, words: [] }]);
		roomVotes.set(roomCode, {});
		roomEliminated.set(roomCode, new Set());
		roomImposters.set(roomCode, imposterIds);

		io.to(roomCode).emit('room_status', { status: 'PLAYING' });

		const turnOrder = shuffled.map(([id]) => id);
		roomTurnOrder.set(roomCode, { order: turnOrder, currentIndex: 0 });

		for (const [id, member] of room) {
			const isImposter = imposterIds.has(id);
			member.socket.emit('game_started', {
				role: isImposter ? 'imposter' : 'player',
				word: isImposter ? null : picked.word,
				hint: isImposter && settings.hints ? picked.hint : null,
				category: picked.category,
				turnOrder,
				currentTurn: turnOrder[0],
				round: 1,
				eliminatedIds: [],
			});
		}

		callback?.({ success: true });
	});

	socket.on('leave_room', (callback: (res: any) => void) => {
		const roomCode = socket.currentRoom;
		if (!roomCode) {
			callback?.({ success: false, error: 'Not in a room' });
			return;
		}
		removeFromRoom(socket.userId!, roomCode);
		socket.leave(roomCode);
		socket.currentRoom = undefined;
		callback?.({ success: true });
	});

	socket.on(
		'kick_member',
		(payload: { targetUserId: string }, callback: (res: any) => void) => {
			const roomCode = socket.currentRoom;
			if (!roomCode) return;
			const room = rooms.get(roomCode);
			const requester = room?.get(socket.userId!);

			if (!requester || requester.role !== 'host') {
				callback?.({
					success: false,
					error: 'Only the host can kick members',
				});
				return;
			}

			const { targetUserId } = payload;
			const target = room?.get(targetUserId);
			if (!target)
				return callback?.({
					success: false,
					error: 'Member not found',
				});
			if (targetUserId === socket.userId) {
				return callback?.({
					success: false,
					error: 'You cannot kick yourself',
				});
			}

			log(
				'KICK',
				`"${requester.name}" kicked "${target.name}" from room ${roomCode}`,
			);
			target.socket.emit('kicked', {
				message: 'You were kicked from the room',
			});
			target.socket.leave(roomCode);
			target.socket.currentRoom = undefined;
			removeFromRoom(targetUserId, roomCode);

			callback?.({ success: true });
		},
	);

	socket.on('chat', (payload: { text: string }) => {
		const roomCode = socket.currentRoom;
		if (!roomCode) return;
		const member = rooms.get(roomCode)?.get(socket.userId!);
		if (!member) return;

		const chatMsg: ChatMessage = {
			from: member.name,
			fromId: socket.userId!,
			text: payload.text.trim().slice(0, 500),
			timestamp: Date.now(),
		};

		const history = roomChats.get(roomCode);
		if (history) {
			history.push(chatMsg);
			if (history.length > 200) history.shift();
		}

		log('CHAT', `Room ${roomCode} "${chatMsg.from}": "${chatMsg.text}"`);
		io.to(roomCode).emit('chat', chatMsg);
	});

	socket.on('stop_game', (callback: (res: any) => void) => {
		const roomCode = socket.currentRoom;
		if (!roomCode) return;
		const room = rooms.get(roomCode);
		const requester = room?.get(socket.userId!);

		if (!requester || requester.role !== 'host') {
			return callback?.({
				success: false,
				error: 'Only the host can stop the game',
			});
		}
		if (roomStatus.get(roomCode) !== 'PLAYING') {
			return callback?.({ success: false, error: 'No game in progress' });
		}

		stopGame(roomCode, 'Host stopped the game');
		callback?.({ success: true });
	});

	socket.on(
		'update_settings',
		(payload: Partial<RoomSettings>, callback: (res: any) => void) => {
			const roomCode = socket.currentRoom;
			if (!roomCode) return;
			const room = rooms.get(roomCode);
			const requester = room?.get(socket.userId!);

			if (!requester || requester.role !== 'host') {
				return callback?.({
					success: false,
					error: 'Only the host can update settings',
				});
			}
			if (roomStatus.get(roomCode) === 'PLAYING') {
				return callback?.({
					success: false,
					error: 'Cannot change settings while game is in progress',
				});
			}

			const current = roomSettings.get(roomCode)!;
			const updated: RoomSettings = {
				imposter_amount: Math.max(
					1,
					Math.min(
						5,
						payload.imposter_amount ?? current.imposter_amount,
					),
				),
				hints: payload.hints ?? current.hints,
				categories:
					payload.categories && payload.categories.length > 0
						? payload.categories
						: current.categories,
			};

			roomSettings.set(roomCode, updated);
			log(
				'SETTINGS UPDATE',
				`Room ${roomCode}: ${JSON.stringify(updated)}`,
			);
			io.to(roomCode).emit('game_settings', { settings: updated });
			callback?.({ success: true });
		},
	);

	socket.on(
		'submit_word',
		(payload: { word: string }, callback: (res: any) => void) => {
			const roomCode = socket.currentRoom;
			if (!roomCode) return;
			const turnData = roomTurnOrder.get(roomCode);
			if (!turnData) return;

			if (turnData.order[turnData.currentIndex] !== socket.userId) {
				return callback?.({
					success: false,
					error: 'It is not your turn',
				});
			}

			const word = (payload.word ?? '').trim().slice(0, 35);
			if (!word)
				return callback?.({
					success: false,
					error: 'Word cannot be empty',
				});

			const member = rooms.get(roomCode)?.get(socket.userId!);
			const round = roomRound.get(roomCode) ?? 1;
			const allWords = roomWords.get(roomCode) ?? [];
			const roundEntry = allWords.find((r) => r.round === round);
			if (roundEntry && member) {
				roundEntry.words.push({
					userId: socket.userId!,
					name: member.name,
					word,
				});
			}

			io.to(roomCode).emit('word_submitted', {
				userId: socket.userId,
				name: member?.name,
				word,
				round,
			});

			const nextIndex = turnData.currentIndex + 1;

			if (nextIndex >= turnData.order.length) {
				roomTurnOrder.delete(roomCode);
				roomVotes.set(roomCode, {});

				io.to(roomCode).emit('round_over', {
					round,
					words: roundEntry?.words ?? [],
					voteDuration: VOTE_DURATION,
				});

				const timer = setTimeout(
					() => resolveVotes(roomCode),
					VOTE_DURATION,
				);
				roomVoteTimers.set(roomCode, timer);
			} else {
				turnData.currentIndex = nextIndex;
				io.to(roomCode).emit('turn_update', {
					currentTurn: turnData.order[nextIndex],
				});
			}

			callback?.({ success: true });
		},
	);

	socket.on(
		'cast_vote',
		(payload: { targetUserId: string }, callback: (res: any) => void) => {
			const roomCode = socket.currentRoom;
			if (!roomCode) return;
			const eliminated = roomEliminated.get(roomCode);
			if (!eliminated) return;

			if (eliminated.has(socket.userId!)) {
				return callback?.({
					success: false,
					error: 'Eliminated players cannot vote',
				});
			}

			const { targetUserId } = payload;
			const room = rooms.get(roomCode);

			if (!room?.has(targetUserId)) {
				return callback?.({
					success: false,
					error: 'Target not found',
				});
			}
			if (targetUserId === socket.userId) {
				return callback?.({
					success: false,
					error: 'Cannot vote for yourself',
				});
			}
			if (eliminated.has(targetUserId)) {
				return callback?.({
					success: false,
					error: 'Cannot vote for an eliminated player',
				});
			}

			const votes = roomVotes.get(roomCode)!;
			votes[socket.userId!] = targetUserId;

			const tally: Record<string, number> = {};
			for (const t of Object.values(votes)) {
				tally[t] = (tally[t] ?? 0) + 1;
			}

			log(
				'VOTE',
				`Room ${roomCode}: "${socket.userId}" voted for "${targetUserId}"`,
			);
			io.to(roomCode).emit('vote_update', { tally });
			callback?.({ success: true });

			const activePlayers = [...room.keys()].filter(
				(id) => !eliminated.has(id),
			);
			if (activePlayers.every((id) => votes[id] !== undefined)) {
				resolveVotes(roomCode);
			}
		},
	);

	socket.on('disconnect', () => {
		log('DISCONNECT', `User ${socket.userId} disconnected`);
		if (socket.currentRoom && rooms.has(socket.currentRoom)) {
			removeFromRoom(socket.userId!, socket.currentRoom);
			socket.currentRoom = undefined;
		}
	});
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
	log('SERVER', `WS server running on port ${PORT}`);
});
