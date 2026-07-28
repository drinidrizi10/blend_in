import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../card';
import { joinFormSchema, JoinFormValues } from '@/lib/schemas';
import { Controller, useForm } from 'react-hook-form';
import { Label } from '../label';

import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose, DialogFooter } from '../dialog';
import { Button } from '../button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../input-otp';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRoom } from '@/hooks/use-room';
import { useRouter } from 'next/navigation';

export default function JoinGameModal() {
	const currentUser = useUser();
	const { joinRoom, isConnected } = useRoom();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const joinForm = useForm<JoinFormValues>({
		resolver: zodResolver(joinFormSchema),
		defaultValues: {
			roomCode: '',
		},
	});

	const handleJoinRoom = async () => {
		if (!currentUser?.isSignedIn || !currentUser.isLoaded) return;
		if (!isConnected) return;

		setIsLoading(true);

		const roomCode = joinForm.getValues('roomCode').toUpperCase();

		console.log(`Join Room: ${roomCode}`);

		const res = await joinRoom(
			roomCode,
			currentUser.user?.fullName || currentUser.user?.id,
		);

		if (res.success) {
			console.log(`Join Room Response: ${JSON.stringify(res)}`);
			// redirect to /room/[roomCode]
			router.push(`/room/${roomCode}`);
		}

		joinForm.reset();
		setIsLoading(false);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Join Game</CardTitle>
				<CardDescription>
					Enter a room code then click{' '}
					<span className='font-bold'>Join Game</span>.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={joinForm.handleSubmit(handleJoinRoom)}
					className='flex flex-col gap-4'>
					<div className='flex flex-col gap-2'>
						<Label htmlFor='join-room-code'>Room Code</Label>
						<Controller
							control={joinForm.control}
							name='roomCode'
							render={({ field }) => (
								<InputOTP
									maxLength={6}
									value={field.value.toUpperCase()}
									onChange={field.onChange}>
									<InputOTPGroup>
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
										<InputOTPSlot index={2} />
										<InputOTPSlot index={3} />
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
									</InputOTPGroup>
								</InputOTP>
							)}
						/>
						{joinForm.formState.errors.roomCode && (
							<p className='text-destructive text-sm'>
								{joinForm.formState.errors.roomCode.message}
							</p>
						)}
					</div>

					<DialogFooter className='max-w-full sm:gap-[4%]'>
						<DialogClose
							className='w-full sm:w-[48%]'
							render={
								<Button
									type='button'
									disabled={isLoading}
									variant='destructive'>
									Cancel
								</Button>
							}
						/>
						<Button
							type='submit'
							disabled={isLoading}
							className='w-full sm:w-[48%] sm:gap-2'>
							Join Game
						</Button>
					</DialogFooter>
				</form>
			</CardContent>
		</Card>
	);
}
