'use client';

import { useRoom } from '@/components/providers/room-provider';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from '@/components/ui/toast';
import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Item, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserAvatars } from '@/hooks/use-user-avatars';
import { Bubble, BubbleContent } from '@/components/ui/bubble';
import {
	Message,
	MessageAvatar,
	MessageContent,
	MessageHeader,
} from '@/components/ui/message';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from '@/components/ui/input-group';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from '@/components/ui/dialog';
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldTitle,
} from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { MultiSelect } from '@/components/ui/multi-select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CATEGORIES } from '@/data/categories';
import { MinusIcon, PlusIcon, Send } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import useWindowSize from '@/hooks/use-window-size';

export default function RoomPage() {
	const {
		members,
		settings,
		roomCode,
		status,
		selfRole,
		selfId,
		messages,
		sendChat,
		startGame,
		leaveRoom,
		updateSettings,
	} = useRoom();
	const avatars = useUserAvatars(members.map((m) => m.id));
	const { width } = useWindowSize();
	const router = useRouter();

	const [chatMessage, setChatMessage] = useState('');
	const [isStarting, setIsStarting] = useState(false);
	const [isLeaving, setIsLeaving] = useState(false);

	// Add bottomRef for auto-scroll alongside other useState:
	const bottomRef = useRef<HTMLDivElement>(null);

	// Settings dialog local draft state
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [isSavingSettings, setIsSavingSettings] = useState(false);
	const [draftSettings, setDraftSettings] = useState({
		imposter_amount: settings?.imposter_amount ?? 1,
		hints: settings?.hints ?? true,
		categories: settings?.categories ?? ['animals'],
	});

	// Sync draft when dialog opens or settings change from server
	useEffect(() => {
		if (settings) {
			setDraftSettings({
				imposter_amount: settings.imposter_amount,
				hints: settings.hints,
				categories: settings.categories,
			});
		}
	}, [settings, settingsOpen]);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const copyToClipboard = ({ text }: { text: string }) => {
		navigator.clipboard.writeText(text);
		toast.add({ type: 'success', title: 'Room Code copied to clipboard' });
	};

	const handleStartGame = async () => {
		setIsStarting(true);
		const res = await startGame();
		if (!res.success) {
			toast.add({
				type: 'error',
				title: res.error ?? 'Failed to start game',
			});
		}
		setIsStarting(false);
	};

	const handleLeaveRoom = async () => {
		setIsLeaving(true);
		await leaveRoom();
		router.push('/');
	};

	const handleSaveSettings = async () => {
		setIsSavingSettings(true);
		const res = await updateSettings(draftSettings);
		if (!res.success) {
			toast.add({
				type: 'error',
				title: res.error ?? 'Failed to update settings',
			});
		} else {
			setSettingsOpen(false);
		}
		setIsSavingSettings(false);
	};

	const handleSendChat = () => {
		const text = chatMessage.trim();
		if (!text) return;
		sendChat(text);
		setChatMessage('');
	};

	const canStart = members.length >= 2 && status === 'OPEN';

	return (
		<div className='flex w-full h-full items-center justify-center'>
			<div className='flex w-full h-full py-3 px-3 md:w-3/4 md:px-0'>
				<Card className='w-full h-full py-0 flex flex-col gap-3 overflow-hidden'>
					<CardHeader className='bg-accent py-1 md:py-3 px-1 md:px-3'>
						<CardTitle className='flex items-center justify-between md:justify-start gap-2'>
							<Tooltip>
								<TooltipTrigger
									render={
										<Badge
											onClick={() =>
												copyToClipboard({
													text: roomCode,
												})
											}
											variant='outline'
											className='text-sm md:text-md p-3.5 font-normal select-none cursor-pointer hover:scale-101 active:scale-99'>
											Room:{' '}
											<span className='font-bold select-text'>
												{roomCode}
											</span>
										</Badge>
									}
								/>
								<TooltipContent>
									<p>
										Click to copy{' '}
										<span className='font-bold'>
											Room Code
										</span>
									</p>
								</TooltipContent>
							</Tooltip>
							<Badge
								variant='outline'
								className='text-sm md:text-md p-3.5 font-normal select-none'>
								Status:{' '}
								<span className='font-bold'>
									{status === 'OPEN' ? 'Open' : 'Playing'}
								</span>
							</Badge>
						</CardTitle>
					</CardHeader>

					<CardContent className='flex-1 min-h-0 px-2 md:px-3 overflow-hidden'>
						<ResizablePanelGroup
							orientation={
								width < 640 ? 'vertical' : 'horizontal'
							}
							className='h-full'>
							<ResizablePanel
								defaultSize={'60%'}
								minSize={'30%'}
								className='pr-4'>
								<h1 className='text-lg font-semibold mb-3'>
									Members List
								</h1>
								<ul className='flex flex-col gap-2'>
									{members.map((m) => (
										<Item
											variant='muted'
											key={m.id}>
											<ItemMedia variant='icon'>
												<Avatar>
													{avatars[m.id]
														?.profile_picture_url && (
														<AvatarImage
															src={
																avatars[m.id]
																	.profile_picture_url!
															}
														/>
													)}
													<AvatarFallback>
														{m.name[0]}
													</AvatarFallback>
												</Avatar>
											</ItemMedia>
											<ItemContent>
												<ItemTitle>
													{m.name}{' '}
													{m.role === 'host' && (
														<Badge>Host</Badge>
													)}
												</ItemTitle>
											</ItemContent>
										</Item>
									))}
								</ul>
							</ResizablePanel>
							<ResizableHandle
								withHandle
								className='m-2'
							/>
							<ResizablePanel
								defaultSize={'40%'}
								minSize={'30%'}
								className='pl-4 flex flex-col min-h-0'>
								<h1 className='text-lg font-semibold mb-3'>
									Chat
								</h1>

								{messages.length === 0 ? (
									<div className='flex-1 flex items-center justify-center'>
										<p className='text-sm text-muted-foreground'>
											No messages yet. Say something!
										</p>
									</div>
								) : (
									<ScrollArea className='flex-1 min-h-0 pr-2'>
										<div className='flex flex-col gap-3'>
											{messages.map((msg) => {
												const isMe =
													msg.fromId === selfId;
												return (
													<Message
														key={
															msg.timestamp +
															msg.fromId
														}
														className={
															isMe
																? 'flex-row-reverse'
																: ''
														}>
														<MessageAvatar>
															<Avatar>
																{avatars[
																	msg.fromId
																]
																	?.profile_picture_url && (
																	<AvatarImage
																		src={
																			avatars[
																				msg
																					.fromId
																			]
																				.profile_picture_url!
																		}
																	/>
																)}
																<AvatarFallback>
																	{
																		msg
																			.from[0]
																	}
																</AvatarFallback>
															</Avatar>
														</MessageAvatar>
														<MessageContent
															className={`gap-1 ${isMe ? 'items-end' : ''}`}>
															<MessageHeader className='px-2'>
																{isMe
																	? 'You'
																	: msg.from}
															</MessageHeader>
															<Bubble
																variant={
																	isMe
																		? 'default'
																		: 'muted'
																}>
																<BubbleContent className='p-2 text-sm wrap-break-word'>
																	{msg.text}
																</BubbleContent>
															</Bubble>
														</MessageContent>
													</Message>
												);
											})}
											<div ref={bottomRef} />
										</div>
									</ScrollArea>
								)}
							</ResizablePanel>
						</ResizablePanelGroup>
					</CardContent>

					<CardFooter className='bg-accent py-1 md:py-3 px-1 md:px-3 gap-2 flex flex-col sm:flex-row justify-between items-center'>
						<ButtonGroup>
							{selfRole === 'host' && (
								<>
									{/* Start Game */}
									{canStart ? (
										<Button
											size={
												width < 640 ? 'sm' : 'default'
											}
											variant='default'
											disabled={isStarting}
											onClick={handleStartGame}>
											{isStarting
												? 'Starting...'
												: 'Start Game'}
										</Button>
									) : (
										<Tooltip>
											<TooltipTrigger
												render={
													<Button
														size={
															width < 640
																? 'sm'
																: 'default'
														}
														variant='default'
														disabled>
														Start Game
													</Button>
												}
											/>
											<TooltipContent>
												<p>
													At least 2 players required
													to start
												</p>
											</TooltipContent>
										</Tooltip>
									)}

									{/* Room Settings */}
									<Dialog
										open={settingsOpen}
										onOpenChange={setSettingsOpen}>
										<DialogTrigger
											render={
												<Button
													size={
														width < 640
															? 'sm'
															: 'default'
													}
													variant='outline'>
													Room Settings
												</Button>
											}
										/>
										<DialogContent className='sm:max-w-sm'>
											<DialogHeader>
												<DialogTitle>
													Room Settings
												</DialogTitle>
												<DialogDescription>
													Changes apply to the next
													game start.
												</DialogDescription>
											</DialogHeader>

											<div className='flex flex-col gap-4 py-2'>
												{/* Imposters */}
												<div className='flex flex-col gap-2'>
													<Label>Imposters</Label>
													<ButtonGroup
														aria-label='Imposter Amount'
														className='h-fit'>
														<Button
															type='button'
															variant='ghost'
															size='icon'
															className='bg-input/50'
															onClick={() =>
																setDraftSettings(
																	(d) => ({
																		...d,
																		imposter_amount:
																			Math.max(
																				1,
																				d.imposter_amount -
																					1,
																			),
																	}),
																)
															}>
															<MinusIcon />
														</Button>
														<Button
															type='button'
															variant='ghost'
															size='icon'
															className='bg-input/50 pointer-events-none'>
															{
																draftSettings.imposter_amount
															}
														</Button>
														<Button
															type='button'
															variant='ghost'
															size='icon'
															className='bg-input/50'
															onClick={() =>
																setDraftSettings(
																	(d) => ({
																		...d,
																		imposter_amount:
																			Math.min(
																				5,
																				d.imposter_amount +
																					1,
																			),
																	}),
																)
															}>
															<PlusIcon />
														</Button>
													</ButtonGroup>
												</div>

												{/* Categories */}
												<div className='flex flex-col gap-2'>
													<Label>Categories</Label>
													<MultiSelect
														options={CATEGORIES.map(
															(c) => ({
																label: c.label,
																value: c.value,
															}),
														)}
														value={
															draftSettings.categories
														}
														onChange={(
															selected,
														) => {
															if (
																selected.length ===
																0
															)
																return;
															setDraftSettings(
																(d) => ({
																	...d,
																	categories:
																		selected,
																}),
															);
														}}
														placeholder='Select categories'
														searchPlaceholder='Search categories...'
													/>
													<p className='text-xs text-muted-foreground'>
														At least one category
														required.
													</p>
												</div>

												{/* Hints */}
												<FieldGroup className='w-full'>
													<FieldLabel htmlFor='switch-hints-settings'>
														<Field orientation='horizontal'>
															<FieldContent>
																<FieldTitle>
																	Imposter
																	Hints?
																</FieldTitle>
																<FieldDescription>
																	Imposters
																	get a broad
																	hint about
																	the word.
																</FieldDescription>
															</FieldContent>
															<Switch
																id='switch-hints-settings'
																checked={
																	draftSettings.hints
																}
																onCheckedChange={(
																	checked,
																) =>
																	setDraftSettings(
																		(
																			d,
																		) => ({
																			...d,
																			hints: checked,
																		}),
																	)
																}
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
															disabled={
																isSavingSettings
															}
															variant='destructive'>
															Cancel
														</Button>
													}
												/>
												<Button
													type='button'
													disabled={isSavingSettings}
													className='w-full sm:w-[48%]'
													onClick={
														handleSaveSettings
													}>
													{isSavingSettings
														? 'Saving...'
														: 'Save Settings'}
												</Button>
											</DialogFooter>
										</DialogContent>
									</Dialog>
								</>
							)}

							{/* Leave Room */}
							<Button
								size={width < 640 ? 'sm' : 'default'}
								variant='destructive'
								disabled={isLeaving}
								onClick={handleLeaveRoom}>
								{isLeaving ? 'Leaving...' : 'Leave Room'}
							</Button>
						</ButtonGroup>

						<ButtonGroup className='max-w-xl w-full'>
							<InputGroup>
								<InputGroupInput
									id='input-button-group'
									placeholder='Write Message...'
									className='text-sm'
									autoComplete='off'
									maxLength={250}
									value={chatMessage}
									onChange={(e) =>
										setChatMessage(e.target.value)
									}
									onKeyDown={(e) => {
										if (e.key === 'Enter' && !e.shiftKey) {
											e.preventDefault();
											handleSendChat();
										}
									}}
								/>
								<InputGroupAddon align='inline-end'>
									<InputGroupText
										className={
											chatMessage.length >= 250
												? 'text-destructive'
												: 'text-muted-foreground'
										}>
										{chatMessage.length > 0 &&
											`${chatMessage.length}/250`}
									</InputGroupText>
								</InputGroupAddon>
							</InputGroup>
							<Button
								variant='outline'
								size={width < 640 ? 'sm' : 'default'}
								disabled={chatMessage.trim().length === 0}
								onClick={handleSendChat}>
								<Send />
								Send
							</Button>
						</ButtonGroup>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
