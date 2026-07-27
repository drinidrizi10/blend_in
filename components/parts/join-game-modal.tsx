import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { joinFormSchema, JoinFormValues } from '@/lib/schemas';
import { Controller, useForm } from 'react-hook-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { useState } from 'react';

export default function JoinGameModal({
	joinGameRoom,
}: {
	joinGameRoom: (data: JoinFormValues) => void;
}) {
	const [isLoading, setIsLoading] = useState(false);
	const joinForm = useForm<JoinFormValues>({
		resolver: zodResolver(joinFormSchema),
		defaultValues: {
			roomCode: '',
		},
	});

	const handleJoinRoom = () => {
		setIsLoading(true);
		// Make sure the room code is always uppercase before sending to parent component
		joinForm.setValue(
			'roomCode',
			joinForm.getValues('roomCode').toUpperCase(),
		);
		joinGameRoom(joinForm.getValues());
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
