'use client';

import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
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
type JoinState = 'connecting' | 'joining' | 'joined' | 'error';

interface RoomContextValue {
	roomCode: string;
	members: Member[];
	settings: RoomSettings | null;
	status: 'OPEN' | 'PLAYING';
	joinState: JoinState;
	error: string | null;
	selfRole: 'host' | 'member' | null;
}

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

		socket.on('members_update', onMembersUpdate);
		socket.on('game_settings', onGameSettings);
		socket.on('room_status', onRoomStatus);

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
		};
	}, [socket, isConnected, roomCode, user?.firstName]);

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
