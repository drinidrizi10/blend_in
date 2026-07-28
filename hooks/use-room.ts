'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSocket } from '@/components/providers/socket-provider';

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

export function useRoom() {
	const { socket, isConnected } = useSocket();
	const [roomCode, setRoomCode] = useState<string | null>(null);
	const [members, setMembers] = useState<Member[]>([]);
	const [settings, setSettings] = useState<RoomSettings | null>(null);
	const [status, setStatus] = useState<'OPEN' | 'PLAYING'>('OPEN');

	useEffect(() => {
		if (!socket) return;

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

		return () => {
			socket.off('members_update', onMembersUpdate);
			socket.off('game_settings', onGameSettings);
			socket.off('room_status', onRoomStatus);
		};
	}, [socket]);

	const createRoom = useCallback(
		(name: string, settingsInput?: Partial<RoomSettings>) => {
			return new Promise<{
				success: boolean;
				roomCode?: string;
				error?: string;
			}>((resolve) => {
				socket?.emit(
					'create_room',
					{ name, settings: settingsInput },
					(res: any) => {
						if (res.success) setRoomCode(res.roomCode);
						resolve(res);
					},
				);
			});
		},
		[socket],
	);

	const joinRoom = useCallback(
		(code: string, name: string) => {
			return new Promise<{ success: boolean; error?: string }>(
				(resolve) => {
					socket?.emit(
						'join_room',
						{ roomCode: code, name },
						(res: any) => {
							if (res.success) setRoomCode(code);
							resolve(res);
						},
					);
				},
			);
		},
		[socket],
	);

	return {
		roomCode,
		members,
		settings,
		status,
		isConnected,
		createRoom,
		joinRoom,
	};
}
