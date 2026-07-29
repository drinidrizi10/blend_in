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
import { useUser } from '@clerk/nextjs';

import HostGameModal from '@/components/ui/parts/host-game-modal';
import JoinGameModal from '@/components/ui/parts/join-game-modal';
import Link from 'next/link';
import LogoIcon from '@/components/custom-icons/logo-icon';

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

export default function Page() {
	const currentUser = useUser();

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
					<LogoIcon />
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
					{!currentUser?.isSignedIn || !currentUser.isLoaded ? (
						<Link href='/sign-in'>
							<Button size='lg'>Start by Signing In</Button>
						</Link>
					) : (
						<DialogTrigger
							className='w-fit px-8 gap-3'
							render={
								<Button size='lg'>
									Play
									<Rocket className='scale-110' />
								</Button>
							}
						/>
					)}
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
								<HostGameModal />
							</motion.div>
						</TabsContent>
						<TabsContent value='join'>
							<motion.div
								variants={cardVariants}
								initial='hidden'
								whileInView='visible'>
								<JoinGameModal />
							</motion.div>
						</TabsContent>
					</Tabs>
				</DialogContent>
			</Dialog>
		</div>
	);
}
