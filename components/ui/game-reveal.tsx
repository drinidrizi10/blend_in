'use client';

import { useEffect, useState } from 'react';
import { useSocket } from '@/components/providers/socket-provider';
import { AnimatePresence, motion } from 'framer-motion';
import { User, HatGlasses } from 'lucide-react';

interface RevealData {
	role: 'imposter' | 'player';
	word: string | null;
	hint: string | null;
	category: string;
}

const DISPLAY_DURATION = 4000;

function InfoCard({
	isImposter,
	reveal,
}: {
	isImposter: boolean;
	reveal: RevealData;
}) {
	return (
		<motion.div
			key='card'
			className={`flex flex-col gap-4 items-center px-16 py-8 min-w-75 max-w-96 w-full h-auto min-h-32 bg-background z-99 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[1rem] pointer-events-none border ${isImposter ? 'border-destructive/60' : 'border-green-400/50'}`}
			initial={{ opacity: 0, scale: 0.85, y: 20 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.85, y: 20 }}
			transition={{
				type: 'spring',
				stiffness: 300,
				damping: 25,
			}}>
			<motion.div
				className={`flex items-center justify-center w-20 h-20 rounded-full ${isImposter ? 'bg-destructive/15 text-destructive' : 'bg-green-400/15 text-green-400'}`}
				initial={{ rotate: -10, scale: 0.8 }}
				animate={{ rotate: 0, scale: 1 }}
				transition={{
					type: 'spring',
					stiffness: 400,
					damping: 20,
					delay: 0.15,
				}}>
				{isImposter ? <HatGlasses size={40} /> : <User size={40} />}
			</motion.div>

			<motion.div
				className='flex flex-col items-center text-center'
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}>
				<h2 className='text-md uppercase tracking-widest text-muted-foreground font-semibold'>
					You are
				</h2>
				<h1
					className={`text-3xl font-bold ${isImposter ? 'text-destructive' : 'text-green-400'}`}>
					{isImposter ? 'Imposter' : 'Civilian'}
				</h1>
			</motion.div>

			<motion.div
				className='flex flex-col items-center text-center'
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}>
				<h2 className='text-md uppercase tracking-widest text-muted-foreground font-semibold'>
					Category
				</h2>
				<h1 className={`text-2xl font-semibold`}>{reveal.category}</h1>
			</motion.div>

			<motion.div
				className='flex flex-col items-center text-center'
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4 }}>
				<h2 className='text-md uppercase tracking-widest text-muted-foreground font-semibold'>
					{isImposter ? 'Your Hint' : 'The Word'}
				</h2>
				<h1 className={`text-2xl font-semibold`}>
					{isImposter
						? reveal.hint || 'No hint, good luck blending in.'
						: reveal.word ||
							'No word was found, try restarting the game!'}
				</h1>
			</motion.div>

			<motion.div className='w-full h-0.5 bg-muted rounded-full overflow-hidden'>
				<motion.div
					className={`h-full ${isImposter ? 'bg-destructive' : 'bg-green-400'}`}
					initial={{ width: '100%' }}
					animate={{ width: '0%' }}
					transition={{
						duration: DISPLAY_DURATION / 1000,
						ease: 'linear',
					}}
				/>
			</motion.div>
		</motion.div>
	);
}

export function GameReveal() {
	const { socket } = useSocket();
	const [reveal, setReveal] = useState<RevealData | null>(null);

	useEffect(() => {
		if (!socket) return;

		function onGameStarted(data: RevealData) {
			setReveal(data);
			setTimeout(() => setReveal(null), DISPLAY_DURATION);
		}

		socket.on('game_started', onGameStarted);
		return () => {
			socket.off('game_started', onGameStarted);
		};
	}, [socket]);

	const isImposter = reveal?.role === 'imposter';

	return (
		<AnimatePresence>
			{reveal && (
				<>
					<motion.div
						key='backdrop'
						className={`fixed inset-0 z-50 ${isImposter ? 'bg-destructive/20' : 'bg-green-400/10'}`}
						style={{ backdropFilter: 'blur(6px)' }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
					/>

					<InfoCard
						isImposter={isImposter}
						reveal={reveal}
					/>
				</>
			)}
		</AnimatePresence>
	);
}
