'use client';

import {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
	ReactNode,
	useRef,
} from 'react';
import { useSocket } from './socket-provider';
import { useUser } from '@clerk/nextjs';

interface Member {
	id: string;
	name: string;
	role: 'host' | 'member';
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

interface RoomContextValue {
	roomCode: string;
	members: Member[];
	settings: RoomSettings | null;
	status: 'OPEN' | 'PLAYING';
	joinState: JoinState;
	error: string | null;
	selfRole: 'host' | 'member' | null;
	messages: ChatMessage[];
	selfId: string | null;
	startGame: () => Promise<{ success: boolean; error?: string }>;
	leaveRoom: () => Promise<{ success: boolean; error?: string }>;
	updateSettings: (
		settings: Partial<RoomSettings>,
	) => Promise<{ success: boolean; error?: string }>;
	sendChat: (text: string) => void;
}

type JoinState = 'connecting' | 'joining' | 'joined' | 'error';

const RoomContext = createContext<RoomContextValue | null>(null);

export function RoomProvider({
	roomCode,
	children,
}: {
	roomCode: string;
	children: ReactNode;
}) {
	const { socket, isConnected } = useSocket();
	const { user } = useUser();
	const [members, setMembers] = useState<Member[]>([]);
	const [settings, setSettings] = useState<RoomSettings | null>(null);
	const [status, setStatus] = useState<'OPEN' | 'PLAYING'>('OPEN');
	const [joinState, setJoinState] = useState<JoinState>('connecting');
	const [error, setError] = useState<string | null>(null);
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const selfId = user?.id ?? null;

	useEffect(() => {
		if (!socket || !isConnected) return;

		function onMembersUpdate({ members }: { members: Member[] }) {
			setMembers(members);
		}
		function onGameSettings({ settings }: { settings: RoomSettings }) {
			setSettings(settings);
		}
		function onRoomStatus({ status }: { status: 'OPEN' | 'PLAYING' }) {
			setStatus(status);
		}
		function onChat(msg: ChatMessage) {
			setMessages((prev) => [...prev, msg]);
		}
		function onChatHistory({ messages }: { messages: ChatMessage[] }) {
			setMessages(messages);
		}

		socket.on('members_update', onMembersUpdate);
		socket.on('game_settings', onGameSettings);
		socket.on('room_status', onRoomStatus);
		socket.on('chat', onChat);
		socket.on('chat_history', onChatHistory);

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
			socket.off('chat_history', onChatHistory);
		};
	}, [socket, isConnected, roomCode, user?.firstName]);

	const startGame = useCallback(() => {
		return new Promise<{ success: boolean; error?: string }>((resolve) => {
			if (!socket)
				return resolve({ success: false, error: 'Not connected' });
			socket.emit('start_game', (res: any) => resolve(res));
		});
	}, [socket]);

	const leaveRoom = useCallback(() => {
		return new Promise<{ success: boolean; error?: string }>((resolve) => {
			if (!socket)
				return resolve({ success: false, error: 'Not connected' });
			socket.emit('leave_room', (res: any) => resolve(res));
		});
	}, [socket]);

	const updateSettings = useCallback(
		(newSettings: Partial<RoomSettings>) => {
			return new Promise<{ success: boolean; error?: string }>(
				(resolve) => {
					if (!socket)
						return resolve({
							success: false,
							error: 'Not connected',
						});
					socket.emit('update_settings', newSettings, (res: any) =>
						resolve(res),
					);
				},
			);
		},
		[socket],
	);

	const sendChat = useCallback(
		(text: string) => {
			if (!socket || !text.trim()) return;
			socket.emit('chat', { text: text.trim().slice(0, 250) });
		},
		[socket],
	);

	const selfRole = members.find((m) => m.id === user?.id)?.role ?? null;

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
				startGame,
				leaveRoom,
				updateSettings,
				sendChat,
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
