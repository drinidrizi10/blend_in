import { RoomProvider } from '@/components/providers/room-provider';
import { RoomGate } from '@/components/auth/room-gate';
import { GameReveal } from '@/components/ui/game-reveal';
import { GameEndReveal } from '@/components/ui/game-end-reveal';

export default async function RoomLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ roomCode: string }>;
}) {
	const { roomCode } = await params;
	return (
		<RoomProvider roomCode={roomCode}>
			<RoomGate>
				{children}
				<GameReveal />
				<GameEndReveal />
			</RoomGate>
		</RoomProvider>
	);
}
