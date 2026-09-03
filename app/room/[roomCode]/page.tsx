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
import { ChevronDown, MinusIcon, PlusIcon, Send } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import useWindowSize from '@/hooks/use-window-size';
import { useSocket } from '@/components/providers/socket-provider';

export default function RoomPage() {
	const {
		members,
		settings,
		roomCode,
		status,
		selfRole,
		selfId,
		messages,
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
	} = useRoom();
	const { socket } = useSocket();
	const avatars = useUserAvatars(members.map((m) => m.id));
	const { width } = useWindowSize();
	const router = useRouter();

	const [chatMessage, setChatMessage] = useState('');
	const [isStarting, setIsStarting] = useState(false);
	const [isLeaving, setIsLeaving] = useState(false);
	const [expandedMembers, setExpandedMembers] = useState<Set<string>>(
		new Set(),
	);
	const [myVote, setMyVote] = useState<string | null>(null);
	const [wordInput, setWordInput] = useState('');
	const [isSubmittingWord, setIsSubmittingWord] = useState(false);

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

	useEffect(() => {
		if (!voteState) setMyVote(null);
	}, [voteState]);

	useEffect(() => {
		if (!socket) return;
		function onKicked() {
			toast.add({
				type: 'error',
				title: 'You were kicked from the room',
			});
			router.push('/');
		}
		socket.on('kicked', onKicked);
		return () => {
			socket.off('kicked', onKicked);
		};
	}, [socket, router]);

	const copyToClipboard = ({ text }: { text: string }) => {
		navigator.clipboard.writeText(text);
		toast.add({ type: 'success', title: 'Room Code copied to clipboard' });
	};

	const handleStartGame = async () => {
		if (!canStart) return;

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

	const handleEndGame = async () => {
		if (status !== 'PLAYING') return;

		setIsStarting(true);
		const res = await stopGame();
		if (!res.success) {
			toast.add({
				type: 'error',
				title: res.error ?? 'Failed to end game',
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

	function toggleMemberExpanded(memberId: string) {
		setExpandedMembers((prev) => {
			const next = new Set(prev);
			next.has(memberId) ? next.delete(memberId) : next.add(memberId);
			return next;
		});
	}

	function getWordHistoryForMember(memberId: string) {
		const history: { round: number; word: string; live?: boolean }[] = [];

		for (const roundData of roundHistory) {
			const entry = roundData.words.find((w) => w.userId === memberId);
			if (entry)
				history.push({ round: roundData.round, word: entry.word });
		}

		const liveEntry = currentRoundWords.find((w) => w.userId === memberId);
		const currentRoundInHistory = roundHistory.find(
			(r) => r.round === currentRound,
		);
		if (liveEntry && !currentRoundInHistory) {
			history.push({
				round: currentRound,
				word: liveEntry.word,
				live: true,
			});
		}

		return history.sort((a, b) => a.round - b.round);
	}

	const isMyTurn = turnState?.currentTurn === selfId;
	const isSelfEliminated = eliminatedIds.includes(selfId ?? '');
	const isVoting = voteState !== null;

	const handleSubmitWord = async () => {
		const text = wordInput.trim();
		if (!text || !isMyTurn) return;
		setIsSubmittingWord(true);
		const res = await submitWord(text);
		if (res.success) setWordInput('');
		setIsSubmittingWord(false);
	};

	const handleCastVote = async (targetUserId: string) => {
		setMyVote(targetUserId);
		await castVote(targetUserId);
	};

	const canStart = members.length >= 3 && status === 'OPEN';

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
							{/* <Badge
								variant='outline'
								className='text-sm md:text-md p-3.5 font-normal select-none'>
								Status:{' '}
								<span className='font-bold'>
									{status === 'OPEN' ? 'Open' : 'Playing'}
								</span>
							</Badge> */}

							{gameState?.role && (
								<Badge
									variant='outline'
									className={`text-sm md:text-md p-3.5 font-normal select-none ${gameState?.role === 'player' ? 'text-green-400' : 'text-destructive'}`}>
									Role:{' '}
									<span className='font-bold'>
										{gameState?.role === 'player'
											? 'Player'
											: 'Imposter'}
									</span>
								</Badge>
							)}

							{gameState?.category && (
								<Badge
									variant='outline'
									className='text-sm md:text-md p-3.5 font-normal select-none'>
									Category:{' '}
									<span className='font-bold'>
										{gameState?.category}
									</span>
								</Badge>
							)}

							{gameState?.word && gameState?.role === 'player' ? (
								<Badge
									variant='outline'
									className='text-sm md:text-md p-3.5 font-normal select-none'>
									Word:{' '}
									<span className='font-bold'>
										{gameState?.word}
									</span>
								</Badge>
							) : null}

							{gameState?.hint &&
							gameState?.role === 'imposter' ? (
								<Badge
									variant='outline'
									className='text-sm md:text-md p-3.5 font-normal select-none'>
									Hint:{' '}
									<span className='font-bold'>
										{gameState?.hint}
									</span>
								</Badge>
							) : null}
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
								className='pr-4 flex flex-col min-h-0 overflow-hidden'>
								<div className='flex items-center justify-between mb-3 shrink-0'>
									<h1 className='text-lg font-semibold'>
										Members
									</h1>
									{isVoting && (
										<div className='flex flex-col items-end gap-1'>
											<span className='text-sm text-muted-foreground'>
												Vote ends in{' '}
												<span
													className={`font-semibold ${voteState.timeLeft <= 10 ? 'text-destructive' : ''}`}>
													{voteState.timeLeft}s
												</span>
											</span>
											<div className='w-32 h-1 bg-muted rounded-full overflow-hidden'>
												<div
													className='h-full bg-primary transition-all duration-1000 ease-linear'
													style={{
														width: `${Math.max(0, (voteState.timeLeft / voteState.voteDuration) * 100)}%`,
													}}
												/>
											</div>
										</div>
									)}
								</div>

								<ScrollArea className='flex-1 min-h-0'>
									<ul className='flex flex-col gap-2 pr-2'>
										{members.map((m) => {
											const turnIndex =
												turnState?.order.indexOf(
													m.id,
												) ?? -1;
											const isCurrentTurn =
												turnState?.currentTurn === m.id;
											const isEliminated =
												eliminatedIds.includes(m.id);
											const isMe = m.id === selfId;
											const voteCount =
												voteState?.tally[m.id] ?? 0;
											const canVote =
												isVoting &&
												!isSelfEliminated &&
												m.id !== selfId &&
												!isEliminated;
											const wordHistory =
												getWordHistoryForMember(m.id);
											const hasHistory =
												wordHistory.length > 0;
											const isExpanded =
												expandedMembers.has(m.id);

											// Word to show inline: current round word if exists, else latest from history
											const currentRoundWord =
												currentRoundWords.find(
													(w) => w.userId === m.id,
												)?.word;
											const latestHistoryWord =
												wordHistory[
													wordHistory.length - 1
												];
											const inlineWord =
												currentRoundWord ??
												(wordHistory.length > 0 &&
												!currentRoundWord
													? latestHistoryWord?.word
													: null);
											const inlineWordIsLive =
												!!currentRoundWord;
											const inlineWordRound =
												currentRoundWord
													? currentRound
													: latestHistoryWord?.round;

											return (
												<li key={m.id}>
													<Item
														variant='muted'
														className={`
                                                            ${isEliminated ? 'opacity-40' : ''}
                                                            ${isCurrentTurn && !isEliminated ? 'border border-green-400' : ''}
                                                            ${hasHistory ? 'cursor-pointer' : ''}
                                                            transition-all
                                                        `}
														onClick={() =>
															hasHistory &&
															toggleMemberExpanded(
																m.id,
															)
														}>
														<ItemMedia variant='icon'>
															<Avatar>
																{avatars[m.id]
																	?.profile_picture_url && (
																	<AvatarImage
																		src={
																			avatars[
																				m
																					.id
																			]
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
															<ItemTitle className='flex flex-wrap items-center gap-1.5'>
																<span
																	className={
																		isEliminated
																			? 'line-through'
																			: ''
																	}>
																	{m.name}
																</span>

																{m.role ===
																	'host' && (
																	<Badge>
																		Host
																	</Badge>
																)}
																{isMe && (
																	<Badge variant='outline'>
																		You
																	</Badge>
																)}
																{isEliminated && (
																	<Badge variant='destructive'>
																		Eliminated
																	</Badge>
																)}

																{!isEliminated &&
																	isCurrentTurn && (
																		<Badge className='bg-green-600 hover:bg-green-600 text-white'>
																			Writing...
																		</Badge>
																	)}
																{!isEliminated &&
																	turnState &&
																	turnIndex !==
																		-1 && (
																		<Badge variant='secondary'>
																			#
																			{turnIndex +
																				1}
																		</Badge>
																	)}
																{isVoting &&
																	!isEliminated &&
																	voteCount >
																		0 && (
																		<Badge variant='secondary'>
																			{
																				voteCount
																			}{' '}
																			vote
																			{voteCount !==
																			1
																				? 's'
																				: ''}
																		</Badge>
																	)}

																{/* Inline word */}
																{inlineWord &&
																	!isExpanded && (
																		<span className='flex items-center gap-1 bg-background/50 rounded px-1.5 py-0.5 font-mono'>
																			<span className='text-sm opacity-50'>
																				R
																				{
																					inlineWordRound
																				}

																				:
																			</span>
																			<span className='text-sm font-medium text-foreground'>
																				{
																					inlineWord
																				}
																			</span>
																			{inlineWordIsLive && (
																				<span className='w-1.5 h-1.5 rounded-full bg-green-500 inline-block' />
																			)}
																			{wordHistory.length >
																				1 && (
																				<span className='text-sm opacity-40'>
																					+
																					{wordHistory.length -
																						1}
																				</span>
																			)}
																		</span>
																	)}
															</ItemTitle>

															{/* Expanded word history */}
															{isExpanded &&
																hasHistory && (
																	<div
																		className='flex flex-wrap gap-1.5 mt-1'
																		onClick={(
																			e,
																		) =>
																			e.stopPropagation()
																		}>
																		{wordHistory.map(
																			(
																				entry,
																			) => (
																				<div
																					key={
																						entry.round
																					}
																					className='flex items-center gap-1 bg-background/50 rounded px-1.5 py-0.5 font-mono'>
																					<span className='text-sm text-muted-foreground'>
																						R
																						{
																							entry.round
																						}
																					</span>
																					<span className='text-sm font-semibold'>
																						{
																							entry.word
																						}
																					</span>
																					{entry.live && (
																						<span className='w-1.5 h-1.5 rounded-full bg-green-500 inline-block' />
																					)}
																				</div>
																			),
																		)}
																	</div>
																)}
														</ItemContent>

														{/* Actions — stop propagation so clicks don't toggle expand */}
														<div
															className='flex items-center gap-1 ml-auto shrink-0'
															onClick={(e) =>
																e.stopPropagation()
															}>
															{canVote && (
																<Button
																	size='sm'
																	variant={
																		myVote ===
																		m.id
																			? 'default'
																			: 'outline'
																	}
																	onClick={() =>
																		handleCastVote(
																			m.id,
																		)
																	}>
																	{myVote ===
																	m.id
																		? '✓ Voted'
																		: 'Vote'}
																</Button>
															)}
															{selfRole ===
																'host' &&
																m.id !==
																	selfId &&
																!isEliminated &&
																!isVoting && (
																	<Button
																		size='sm'
																		variant='destructive'
																		onClick={() =>
																			kickMember(
																				m.id,
																			)
																		}>
																		Kick
																	</Button>
																)}
															{hasHistory && (
																<ChevronDown
																	size={14}
																	className={`text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`}
																/>
															)}
														</div>
													</Item>
												</li>
											);
										})}
									</ul>
								</ScrollArea>

								{/* Word submission footer — only shown during turn phase */}
								{gameState && !isVoting && (
									<div className='mt-3 shrink-0'>
										<ButtonGroup className='w-full'>
											<InputGroup>
												<InputGroupInput
													placeholder={
														isSelfEliminated
															? 'You are eliminated'
															: isMyTurn
																? 'Write your word...'
																: 'Waiting for your turn...'
													}
													disabled={
														!isMyTurn ||
														isSelfEliminated ||
														isSubmittingWord
													}
													maxLength={35}
													value={wordInput}
													onChange={(e) =>
														setWordInput(
															e.target.value,
														)
													}
													onKeyDown={(e) => {
														if (
															e.key === 'Enter' &&
															!e.shiftKey
														) {
															e.preventDefault();
															handleSubmitWord();
														}
													}}
												/>
												<InputGroupAddon align='inline-end'>
													<InputGroupText className='text-muted-foreground text-xs'>
														{wordInput.length > 0 &&
															`${wordInput.length}/35`}
													</InputGroupText>
												</InputGroupAddon>
											</InputGroup>
											<Button
												disabled={
													!isMyTurn ||
													wordInput.trim().length ===
														0 ||
													isSelfEliminated ||
													isSubmittingWord
												}
												onClick={handleSubmitWord}>
												Submit
											</Button>
										</ButtonGroup>
									</div>
								)}

								{/* Voting footer */}
								{isVoting && (
									<p className='text-sm text-muted-foreground text-center mt-3 shrink-0'>
										{isSelfEliminated
											? 'You are eliminated — spectating only.'
											: myVote
												? 'Vote cast! Waiting for others...'
												: 'Vote for who you think is the imposter.'}
									</p>
								)}
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
									{/* Start/End Game */}
									{status === 'PLAYING' ? (
										<Button
											size={
												width < 640 ? 'sm' : 'default'
											}
											variant='default'
											disabled={
												isStarting ||
												status !== 'PLAYING'
											}
											onClick={handleEndGame}>
											{isStarting
												? 'Ending...'
												: 'End Game'}
										</Button>
									) : (
										<Button
											size={
												width < 640 ? 'sm' : 'default'
											}
											variant='default'
											disabled={isStarting || !canStart}
											onClick={handleStartGame}>
											{isStarting
												? 'Starting...'
												: 'Start Game'}
										</Button>
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
