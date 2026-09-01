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
					{/* Backdrop */}
					<motion.div
						key='backdrop'
						className={`fixed inset-0 z-50 ${isImposter ? 'bg-destructive/20' : 'bg-green-400/10'}`}
						style={{ backdropFilter: 'blur(6px)' }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
					/>

					{/* Card */}
					<motion.div
						key='card'
						className='fixed inset-0 z-50 flex items-center justify-center pointer-events-none'
						initial={{ opacity: 0, scale: 0.85, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.85, y: 20 }}
						transition={{
							type: 'spring',
							stiffness: 300,
							damping: 25,
						}}>
						<div className='flex flex-col items-center gap-6 rounded-2xl border p-10 bg-background/90 max-w-sm w-full mx-4'>
							{/* Icon */}
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
								{isImposter ? (
									<HatGlasses size={40} />
								) : (
									<User size={40} />
								)}
							</motion.div>

							{/* Role */}
							<motion.div
								className='flex flex-col items-center gap-1 text-center'
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}>
								<p className='text-sm uppercase tracking-widest text-muted-foreground'>
									You are
								</p>
								<h1
									className={`text-4xl font-bold ${isImposter ? 'text-destructive' : 'text-green-400'}`}>
									{isImposter ? 'The Imposter' : 'A Player'}
								</h1>
							</motion.div>

							<div className='w-full h-px bg-border' />

							{/* Category */}
							<motion.div
								className='flex flex-col items-center gap-1 text-center'
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}>
								<p className='text-xs uppercase tracking-widest text-muted-foreground'>
									Category
								</p>
								<p className='text-lg font-semibold'>
									{reveal.category}
								</p>
							</motion.div>

							{/* Word or Hint */}
							<motion.div
								className='flex flex-col items-center gap-1 text-center'
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}>
								{isImposter ? (
									reveal.hint ? (
										<>
											<p className='text-xs uppercase tracking-widest text-muted-foreground'>
												Your Hint
											</p>
											<p className='text-lg font-semibold text-destructive'>
												{reveal.hint}
											</p>
										</>
									) : (
										<p className='text-sm text-muted-foreground'>
											No hint — good luck blending in.
										</p>
									)
								) : (
									<>
										<p className='text-xs uppercase tracking-widest text-muted-foreground'>
											The Word
										</p>
										<p className='text-2xl font-bold text-green-400'>
											{reveal.word}
										</p>
									</>
								)}
							</motion.div>

							{/* Progress bar */}
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
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
