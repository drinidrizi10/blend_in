import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../card';
import { hostFormSchema, HostFormValues } from '@/lib/schemas';
import { Controller, useForm } from 'react-hook-form';
import { Label } from '../label';
import { Input } from '../input';
import { MultiSelect } from '../multi-select';

import { zodResolver } from '@hookform/resolvers/zod';

import { CATEGORIES } from '@/data/categories';
import { DialogClose, DialogFooter } from '../dialog';
import { Button } from '../button';
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldTitle,
} from '../field';
import { Switch } from '../switch';
import { ButtonGroup } from '../button-group';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRoom } from '@/hooks/use-room';
import { useRouter } from 'next/navigation';

export default function HostGameModal() {
	const currentUser = useUser();
	const { createRoom, isConnected } = useRoom();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const hostForm = useForm<HostFormValues>({
		resolver: zodResolver(hostFormSchema),
		defaultValues: {
			imposter_amount: 1,
			hints: true,
			categories: ['animals'],
		},
	});

	const handleImposterIncrement = () => {
		const currentImposterAmount = hostForm.getValues('imposter_amount');
		if (currentImposterAmount >= 3) return;

		hostForm.setValue(
			'imposter_amount',
			hostForm.getValues('imposter_amount') + 1,
		);
	};

	const handleImposterDecrement = () => {
		const currentImposterAmount = hostForm.getValues('imposter_amount');
		if (currentImposterAmount <= 1) return;

		hostForm.setValue(
			'imposter_amount',
			hostForm.getValues('imposter_amount') - 1,
		);
	};

	const handleHostRoom = async () => {
		if (!currentUser?.isSignedIn || !currentUser.isLoaded) return;
		if (!isConnected) return;

		setIsLoading(true);

		console.log(`Create Room: ${JSON.stringify(hostForm.getValues())}`);

		const res = await createRoom(
			currentUser.user?.fullName || currentUser.user?.id,
			hostForm.getValues(),
		);

		if (res.success) {
			console.log(`Create Room Response: ${JSON.stringify(res)}`);
			// redirect to /room/[roomCode]
			router.push(`/room/${res.roomCode}`);
		}

		hostForm.reset();
		setIsLoading(false);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Host Game</CardTitle>
				<CardDescription>
					Set up your game settings then click{' '}
					<span className='font-bold'>Host Game</span>.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={hostForm.handleSubmit(handleHostRoom)}
					className='flex flex-col gap-4'>
					<div className='flex items-center justify-between'>
						<div className='flex flex-col gap-2'>
							<Label htmlFor='imposter-amount'>Imposters</Label>
							<ButtonGroup
								aria-label='Imposter Amount'
								className='h-fit'>
								<Button
									variant='ghost'
									size='icon'
									className='bg-input/50'
									onClick={handleImposterDecrement}>
									<MinusIcon />
								</Button>
								<Input
									type='number'
									disabled
									hidden
									className='flex items-center justify-center'
									{...hostForm.register('imposter_amount', {
										valueAsNumber: true,
									})}
								/>
								<Button
									variant='ghost'
									size='icon'
									className='bg-input/50'>
									{hostForm.watch('imposter_amount')}
								</Button>
								<Button
									variant='ghost'
									size='icon'
									className='bg-input/50'
									onClick={handleImposterIncrement}>
									<PlusIcon />
								</Button>
							</ButtonGroup>
							{hostForm.formState.errors.imposter_amount && (
								<p className='text-destructive text-sm'>
									{
										hostForm.formState.errors
											.imposter_amount.message
									}
								</p>
							)}
						</div>
					</div>

					<div className='flex flex-col gap-2'>
						<Label>Categories</Label>

						<Controller
							control={hostForm.control}
							name='categories'
							render={({ field }) => (
								<MultiSelect
									options={CATEGORIES}
									value={field.value}
									onChange={field.onChange}
									placeholder='Select categories'
								/>
							)}
						/>

						{hostForm.formState.errors.categories && (
							<p className='text-destructive text-sm'>
								{hostForm.formState.errors.categories.message}
							</p>
						)}
					</div>

					<div className='flex flex-col gap-2'>
						<FieldGroup className='w-full max-w-sm'>
							<FieldLabel htmlFor='switch-hints'>
								<Field orientation='horizontal'>
									<FieldContent>
										<FieldTitle>Imposter Hints?</FieldTitle>
										<FieldDescription>
											With this enabled, Imposters will
											have a broad hint about the word
											shown to others.
										</FieldDescription>
									</FieldContent>
									<Switch
										id='switch-hints'
										onCheckedChange={(checked) => {
											hostForm.setValue('hints', checked);
										}}
										{...hostForm.register('hints')}
										defaultChecked
									/>
								</Field>
							</FieldLabel>
						</FieldGroup>
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
							Host Game
						</Button>
					</DialogFooter>
				</form>
			</CardContent>
		</Card>
	);
}
