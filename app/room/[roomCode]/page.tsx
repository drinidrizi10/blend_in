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
	InputGroupTextarea,
} from '@/components/ui/input-group';
import { useState } from 'react';
import { Send } from 'lucide-react';
import useWindowSize from '@/hooks/use-window-size';

export default function RoomPage() {
	const { members, settings, roomCode, status, selfRole } = useRoom();
	const avatars = useUserAvatars(members.map((m) => m.id));
	const { width } = useWindowSize();

	const copyToClipboard = ({ text }: { text: string }) => {
		navigator.clipboard.writeText(text);
		toast.add({
			type: 'success',
			title: 'Room Code copied to clipboard',
		});
	};

	const [chatMessage, setChatMessage] = useState('');

	return (
		<div className='flex w-full h-full items-center justify-center '>
			<div className='flex w-full h-full py-3 px-3 md:w-3/4 md:px-0'>
				<Card className='w-full h-full py-0 flex flex-col justify-between gap-3'>
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
					<CardContent className='flex-1 px-2 md:px-3'>
						<ResizablePanelGroup
							orientation={
								width < 640 ? 'vertical' : 'horizontal'
							}>
							<ResizablePanel
								defaultSize={'60%'}
								minSize={'30%'}
								className='pr-4'>
								{/* Members List & Selected Word & Player Role */}
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
								className='pl-4'>
								{/* Chat */}
								<h1 className='text-lg font-semibold mb-3'>
									Chat
								</h1>
								<Message>
									<MessageAvatar>
										<Avatar>
											<AvatarFallback>B</AvatarFallback>
										</Avatar>
									</MessageAvatar>
									<MessageContent className='gap-1'>
										<MessageHeader className='px-2'>
											BlendIn Development
										</MessageHeader>
										<Bubble variant='muted'>
											<BubbleContent className='p-2'>
												First message of the room!
											</BubbleContent>
										</Bubble>
									</MessageContent>
								</Message>
							</ResizablePanel>
						</ResizablePanelGroup>
					</CardContent>
					<CardFooter className='bg-accent py-1 md:py-3 px-1 md:px-3 gap-2 flex flex-col sm:flex-row justify-between items-center'>
						<ButtonGroup>
							{selfRole === 'host' && (
								<>
									<Button
										size={width < 640 ? 'sm' : 'default'}
										variant='default'>
										Start Game
									</Button>
									<Button
										size={width < 640 ? 'sm' : 'default'}
										variant='outline'>
										Room Settings
									</Button>
								</>
							)}
							<Button
								size={width < 640 ? 'sm' : 'default'}
								variant='destructive'>
								Leave Room
							</Button>
						</ButtonGroup>
						<ButtonGroup className='max-w-xl w-full'>
							<InputGroup>
								<InputGroupInput
									id='input-button-group'
									placeholder='Write Message...'
									className='text-sm'
									autoComplete='off'
									value={chatMessage}
									onChange={(e) =>
										setChatMessage(e.target.value)
									}
								/>
								<InputGroupAddon align='inline-end'>
									<InputGroupText className='text-destructive'>
										{chatMessage.length >= 250 &&
											chatMessage.length}
									</InputGroupText>
								</InputGroupAddon>
							</InputGroup>
							<Button
								variant='outline'
								size={width < 640 ? 'sm' : 'default'}
								disabled={chatMessage.trim().length === 0}>
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
