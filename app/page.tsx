'use client';

import { Button } from '@/components/ui/button';
import { Rocket, Server, SquarePlus } from 'lucide-react';
import { motion } from 'motion/react';
import { Variants } from 'motion';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

import HostGameModal from '@/components/parts/host-game-modal';
import JoinGameModal from '@/components/parts/join-game-modal';

const draw: Variants = {
	hidden: { pathLength: 0, opacity: 0 },
	visible: {
		pathLength: 1,
		opacity: 1,
		transition: {
			pathLength: {
				type: 'spring',
				delay: 0.15,
				duration: 2,
				bounce: 0,
			},
			opacity: { delay: 0, duration: 0.7 },
		},
	},
};

const cardVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 25,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: 'spring',
			damping: 15,
			duration: 0.5,
		},
	},
};

const HatIcon = () => {
	return (
		<motion.svg
			xmlns='http://www.w3.org/2000/svg'
			width='64'
			height='64'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			className='lucide lucide-hat-glasses-icon lucide-hat-glasses'
			initial='hidden'
			animate='visible'>
			<motion.path
				d='M14 18a2 2 0 0 0-4 0'
				variants={draw}
				custom={1}
			/>
			<motion.path
				d='m19 11-2.11-6.657a2 2 0 0 0-2.752-1.148l-1.276.61A2 2 0 0 1 12 4H8.5a2 2 0 0 0-1.925 1.456L5 11'
				variants={draw}
				custom={1}
			/>
			<motion.path
				d='M2 11h20'
				variants={draw}
				custom={1}
			/>
			<motion.circle
				cx='17'
				cy='18'
				r='3'
				variants={draw}
				custom={1}
			/>
			<motion.circle
				cx='7'
				cy='18'
				r='3'
				variants={draw}
				custom={1}
			/>
		</motion.svg>
	);
};

export default function Page() {
	return (
		<div className='flex w-3/4 h-full flex-col justify-center gap-4'>
			<motion.h1
				initial={{ opacity: 0, x: 25 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ type: 'spring', duration: 1.2 }}
				className='text-7xl text-primary font-bold flex items-center gap-2'>
				Blend In{' '}
				<motion.div
					initial={{ rotate: 0, y: 200, opacity: 0 }}
					animate={{ rotate: 35, y: 0, opacity: 1 }}
					transition={{ type: 'spring', damping: 15, mass: 2 }}
					className='relative -top-8 -left-4'>
					<HatIcon />
				</motion.div>
			</motion.h1>
			<div className='flex flex-col gap-2'>
				<motion.p
					initial={{ opacity: 0, x: 25 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{
						type: 'spring',
						damping: 15,
						delay: 0.15,
						duration: 1,
					}}
					className='text-4xl font-semibold'>
					Everyone has a clue. Someone has a secret.
				</motion.p>
				<motion.p
					initial={{ opacity: 0, x: 25 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{
						type: 'spring',
						damping: 15,
						delay: 0.35,
						duration: 1,
					}}
					className='text-3xl font-medium text-secondary-foreground'>
					Find the player who's pretending before they figure it all
					out.
				</motion.p>
			</div>

			<Dialog>
				<motion.div
					initial={{ opacity: 0, y: 25 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						type: 'spring',
						damping: 15,
						delay: 0.55,
						duration: 1,
					}}>
					<DialogTrigger
						className='w-fit px-8 gap-3'
						render={
							<Button size='lg'>
								Play
								<Rocket className='scale-110' />
							</Button>
						}
					/>
				</motion.div>
				<DialogContent showCloseButton={false}>
					<Tabs defaultValue='host'>
						<DialogHeader>
							<DialogTitle>
								<TabsList
									variant='default'
									className='w-full'>
									<TabsTrigger value='host'>
										<Server size={32} />
										Host Game
									</TabsTrigger>
									<TabsTrigger value='join'>
										<SquarePlus size={32} />
										Join Game
									</TabsTrigger>
								</TabsList>
							</DialogTitle>
						</DialogHeader>

						<TabsContent value='host'>
							<motion.div
								variants={cardVariants}
								initial='hidden'
								whileInView='visible'>
								<HostGameModal
									hostRoom={(data) => console.log(data)}
								/>
							</motion.div>
						</TabsContent>
						<TabsContent value='join'>
							<motion.div
								variants={cardVariants}
								initial='hidden'
								whileInView='visible'>
								<JoinGameModal
									joinGameRoom={(data) => console.log(data)}
								/>
							</motion.div>
						</TabsContent>
					</Tabs>
				</DialogContent>
			</Dialog>
		</div>
	);
}
