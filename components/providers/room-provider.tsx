'use client';

import {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
	useRef,
	ReactNode,
} from 'react';
import { useSocket } from './socket-provider';
import { useUser } from '@clerk/nextjs';

// ---------- Types ----------

export interface Member {
	id: string;
	name: string;
	role: 'host' | 'member';
}

export interface RoomSettings {
	imposter_amount: number;
	hints: boolean;
	categories: string[];
}

export interface ChatMessage {
	from: string;
	fromId: string;
	text: string;
	timestamp: number;
}

export interface GameState {
	role: 'imposter' | 'player';
	word: string | null;
	hint: string | null;
	category: string;
}

export interface TurnState {
	order: string[]; // ordered userId array
	currentTurn: string; // userId of whoever's turn it is
}

export interface RoundWords {
	round: number;
	words: { userId: string; name: string; word: string }[];
}

export interface VoteState {
	tally: Record<string, number>;
	timeLeft: number;
	voteDuration: number;
}

type JoinState = 'connecting' | 'joining' | 'joined' | 'error';

interface RoomContextValue {
	// Room
	roomCode: string;
	members: Member[];
	settings: RoomSettings | null;
	status: 'OPEN' | 'PLAYING';
	joinState: JoinState;
	error: string | null;
	selfRole: 'host' | 'member' | null;
	selfId: string | null;

	// Chat
	messages: ChatMessage[];
	sendChat: (text: string) => void;

	// Game
	gameState: GameState | null;
	turnState: TurnState | null;
	currentRound: number;
	currentRoundWords: { userId: string; name: string; word: string }[];
	roundHistory: RoundWords[];
	voteState: VoteState | null;
	eliminatedIds: string[];

	// Actions
	startGame: () => Promise<{ success: boolean; error?: string }>;
	leaveRoom: () => Promise<{ success: boolean; error?: string }>;
	updateSettings: (
		settings: Partial<RoomSettings>,
	) => Promise<{ success: boolean; error?: string }>;
	submitWord: (word: string) => Promise<{ success: boolean; error?: string }>;
	castVote: (
		targetUserId: string,
	) => Promise<{ success: boolean; error?: string }>;
	kickMember: (
		targetUserId: string,
	) => Promise<{ success: boolean; error?: string }>;
	stopGame: () => Promise<{ success: boolean; error?: string }>;
}

const RoomContext = createContext<RoomContextValue | null>(null);

// ---------- Provider ----------

export function RoomProvider({
	roomCode,
	children,
}: {
	roomCode: string;
	children: ReactNode;
}) {
	const { socket, isConnected } = useSocket();
	const { user } = useUser();

	// Room state
	const [members, setMembers] = useState<Member[]>([]);
	const [settings, setSettings] = useState<RoomSettings | null>(null);
	const [status, setStatus] = useState<'OPEN' | 'PLAYING'>('OPEN');
	const [joinState, setJoinState] = useState<JoinState>('connecting');
	const [error, setError] = useState<string | null>(null);

	// Chat state
	const [messages, setMessages] = useState<ChatMessage[]>([]);

	// Game state
	const [gameState, setGameState] = useState<GameState | null>(null);
	const [turnState, setTurnState] = useState<TurnState | null>(null);
	const [currentRound, setCurrentRound] = useState<number>(1);
	const [currentRoundWords, setCurrentRoundWords] = useState<
		{ userId: string; name: string; word: string }[]
	>([]);
	const [roundHistory, setRoundHistory] = useState<RoundWords[]>([]);
	const [voteState, setVoteState] = useState<VoteState | null>(null);
	const [eliminatedIds, setEliminatedIds] = useState<string[]>([]);

	const voteTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const selfId = user?.id ?? null;

	function startVoteCountdown(duration: number) {
		if (voteTimerRef.current) clearInterval(voteTimerRef.current);
		let remaining = Math.floor(duration / 1000);
		setVoteState({
			tally: {},
			timeLeft: remaining,
			voteDuration: remaining,
		});
		voteTimerRef.current = setInterval(() => {
			remaining -= 1;
			setVoteState((prev) =>
				prev ? { ...prev, timeLeft: remaining } : null,
			);
			if (remaining <= 0 && voteTimerRef.current) {
				clearInterval(voteTimerRef.current);
			}
		}, 1000);
	}

	useEffect(() => {
		if (!socket || !isConnected) return;

		// Room listeners
		function onMembersUpdate({ members }: { members: Member[] }) {
			setMembers(members);
		}
		function onGameSettings({ settings }: { settings: RoomSettings }) {
			setSettings(settings);
		}
		function onRoomStatus({ status }: { status: 'OPEN' | 'PLAYING' }) {
			setStatus(status);
		}

		// Chat listeners
		function onChat(msg: ChatMessage) {
			setMessages((prev) => [...prev, msg]);
		}
		function onBroadcast(msg: ChatMessage) {
			setMessages((prev) => [...prev, msg]);
		}
		function onChatHistory({ messages }: { messages: ChatMessage[] }) {
			setMessages(messages);
		}

		// Game listeners
		function onGameStarted(data: {
			role: 'imposter' | 'player';
			word: string | null;
			hint: string | null;
			category: string;
			turnOrder: string[];
			currentTurn: string;
			round: number;
			eliminatedIds: string[];
		}) {
			setGameState({
				role: data.role,
				word: data.word,
				hint: data.hint,
				category: data.category,
			});
			setTurnState({
				order: data.turnOrder,
				currentTurn: data.currentTurn,
			});
			setCurrentRound(data.round);
			setCurrentRoundWords([]);
			setRoundHistory([]);
			setEliminatedIds(data.eliminatedIds);
			setVoteState(null);
			setMessages([]);
		}

		function onTurnUpdate({ currentTurn }: { currentTurn: string }) {
			setTurnState((prev) => (prev ? { ...prev, currentTurn } : null));
		}

		function onWordSubmitted(data: {
			userId: string;
			name: string;
			word: string;
			round: number;
		}) {
			setCurrentRoundWords((prev) => [
				...prev,
				{
					userId: data.userId,
					name: data.name,
					word: data.word,
				},
			]);
		}

		function onRoundOver(data: {
			round: number;
			words: { userId: string; name: string; word: string }[];
			voteDuration: number;
		}) {
			setTurnState(null);
			setRoundHistory((prev) => [
				...prev,
				{ round: data.round, words: data.words },
			]);
			setCurrentRoundWords([]);
			startVoteCountdown(data.voteDuration);
		}

		function onVoteUpdate({ tally }: { tally: Record<string, number> }) {
			setVoteState((prev) => (prev ? { ...prev, tally } : null));
		}

		function onVoteResult({
			eliminatedId,
		}: {
			eliminatedId: string | null;
			tally: Record<string, number>;
		}) {
			if (voteTimerRef.current) clearInterval(voteTimerRef.current);
			if (eliminatedId) {
				setEliminatedIds((prev) => [...prev, eliminatedId]);
			}
		}

		function onNewRound(data: {
			round: number;
			turnOrder: string[];
			currentTurn: string;
			eliminatedIds: string[];
		}) {
			setCurrentRound(data.round);
			setCurrentRoundWords([]);
			setTurnState({
				order: data.turnOrder,
				currentTurn: data.currentTurn,
			});
			setEliminatedIds(data.eliminatedIds);
			setVoteState(null);
		}

		function onGameOver() {
			setGameState(null);
			setTurnState(null);
			setVoteState(null);
			setCurrentRoundWords([]);
			setEliminatedIds([]);
			setStatus('OPEN');
			if (voteTimerRef.current) clearInterval(voteTimerRef.current);
		}

		function onKicked({ message }: { message: string }) {
			setGameState(null);
			setTurnState(null);
			setVoteState(null);
			setCurrentRoundWords([]);
			setRoundHistory([]);
			setEliminatedIds([]);
			setMembers([]);
			setMessages([]);
			setStatus('OPEN');
			if (voteTimerRef.current) clearInterval(voteTimerRef.current);
		}

		socket.on('members_update', onMembersUpdate);
		socket.on('game_settings', onGameSettings);
		socket.on('room_status', onRoomStatus);
		socket.on('chat', onChat);
		socket.on('broadcast', onBroadcast);
		socket.on('chat_history', onChatHistory);
		socket.on('game_started', onGameStarted);
		socket.on('turn_update', onTurnUpdate);
		socket.on('word_submitted', onWordSubmitted);
		socket.on('round_over', onRoundOver);
		socket.on('vote_update', onVoteUpdate);
		socket.on('vote_result', onVoteResult);
		socket.on('new_round', onNewRound);
		socket.on('game_over', onGameOver);
		socket.on('kicked', onKicked);

		setJoinState('joining');
		const name = user?.firstName ?? 'Player';

		socket.emit('join_room', { roomCode, name }, (res: any) => {
			if (res.success) {
				setJoinState('joined');
				if (res.settings) setSettings(res.settings);
				if (res.status) setStatus(res.status);
			} else {
				setJoinState('error');
				setError(res.error ?? 'Unable to join room');
			}
		});

		return () => {
			socket.off('members_update', onMembersUpdate);
			socket.off('game_settings', onGameSettings);
			socket.off('room_status', onRoomStatus);
			socket.off('chat', onChat);
			socket.off('broadcast', onBroadcast);
			socket.off('chat_history', onChatHistory);
			socket.off('game_started', onGameStarted);
			socket.off('turn_update', onTurnUpdate);
			socket.off('word_submitted', onWordSubmitted);
			socket.off('round_over', onRoundOver);
			socket.off('vote_update', onVoteUpdate);
			socket.off('vote_result', onVoteResult);
			socket.off('new_round', onNewRound);
			socket.off('game_over', onGameOver);
			socket.off('kicked', onKicked);
			if (voteTimerRef.current) clearInterval(voteTimerRef.current);
		};
	}, [socket, isConnected, roomCode, user?.firstName]);

	// ---------- Actions ----------

	const startGame = useCallback(
		() =>
			new Promise<{ success: boolean; error?: string }>((resolve) => {
				if (!socket)
					return resolve({ success: false, error: 'Not connected' });
				socket.emit('start_game', (res: any) => resolve(res));
			}),
		[socket],
	);

	const leaveRoom = useCallback(
		() =>
			new Promise<{ success: boolean; error?: string }>((resolve) => {
				if (!socket)
					return resolve({ success: false, error: 'Not connected' });
				socket.emit('leave_room', (res: any) => resolve(res));
			}),
		[socket],
	);

	const updateSettings = useCallback(
		(newSettings: Partial<RoomSettings>) =>
			new Promise<{ success: boolean; error?: string }>((resolve) => {
				if (!socket)
					return resolve({ success: false, error: 'Not connected' });
				socket.emit('update_settings', newSettings, (res: any) =>
					resolve(res),
				);
			}),
		[socket],
	);

	const sendChat = useCallback(
		(text: string) => {
			if (!socket || !text.trim()) return;
			socket.emit('chat', { text: text.trim().slice(0, 250) });
		},
		[socket],
	);

	const submitWord = useCallback(
		(word: string) =>
			new Promise<{ success: boolean; error?: string }>((resolve) => {
				if (!socket)
					return resolve({ success: false, error: 'Not connected' });
				socket.emit('submit_word', { word }, (res: any) =>
					resolve(res),
				);
			}),
		[socket],
	);

	const castVote = useCallback(
		(targetUserId: string) =>
			new Promise<{ success: boolean; error?: string }>((resolve) => {
				if (!socket)
					return resolve({ success: false, error: 'Not connected' });
				socket.emit('cast_vote', { targetUserId }, (res: any) =>
					resolve(res),
				);
			}),
		[socket],
	);

	const kickMember = useCallback(
		(targetUserId: string) =>
			new Promise<{ success: boolean; error?: string }>((resolve) => {
				if (!socket)
					return resolve({ success: false, error: 'Not connected' });
				socket.emit('kick_member', { targetUserId }, (res: any) =>
					resolve(res),
				);
			}),
		[socket],
	);

	const stopGame = useCallback(
		() =>
			new Promise<{ success: boolean; error?: string }>((resolve) => {
				if (!socket)
					return resolve({ success: false, error: 'Not connected' });
				socket.emit('stop_game', (res: any) => resolve(res));
			}),
		[socket],
	);

	const selfRole = members.find((m) => m.id === selfId)?.role ?? null;

	return (
		<RoomContext.Provider
			value={{
				roomCode,
				members,
				settings,
				status,
				joinState,
				error,
				selfRole,
				messages,
				selfId,
				gameState,
				turnState,
				currentRound,
				currentRoundWords,
				roundHistory,
				voteState,
				eliminatedIds,
				sendChat,
				startGame,
				leaveRoom,
				updateSettings,
				submitWord,
				castVote,
				kickMember,
				stopGame,
			}}>
			{children}
		</RoomContext.Provider>
	);
}

export function useRoom() {
	const ctx = useContext(RoomContext);
	if (!ctx) throw new Error('useRoom must be used within a RoomProvider');
	return ctx;
}
