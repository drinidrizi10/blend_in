'use client';

import { useEffect, useRef, useState } from 'react';
import { useSocket } from '@/components/providers/socket-provider';
import { AnimatePresence, motion } from 'framer-motion';
import { HatGlasses, Trophy, Skull, Users, X } from 'lucide-react';

interface ImposterRevealData {
	userId: string;
	name: string;
	wasEliminated: boolean;
	wordsByRound: { round: number; word: string | null }[];
}

interface GameOverData {
	reason: string;
	outcome:
		| 'players_win'
		| 'imposters_win'
		| 'insufficient_players'
		| 'stopped';
	category: string | null;
	word: string | null;
	hint: string | null;
	imposters: ImposterRevealData[];
}

export function GameEndReveal() {
	const { socket } = useSocket();
	const [data, setData] = useState<GameOverData | null>(null);
	const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (!socket) return;

		function onGameOver(payload: GameOverData) {
			if (payload.outcome === 'stopped') return;
			setData(payload);

			if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
			dismissTimerRef.current = setTimeout(() => setData(null), 10000);
		}

		function onGameStarted() {
			if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
			setData(null);
		}

		socket.on('game_over', onGameOver);
		socket.on('game_started', onGameStarted);

		return () => {
			socket.off('game_over', onGameOver);
			socket.off('game_started', onGameStarted);
			if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
		};
	}, [socket]);

	const isPlayersWin = data?.outcome === 'players_win';
	const isInsufficientPlayers = data?.outcome === 'insufficient_players';

	const accent = isPlayersWin
		? 'text-green-400'
		: isInsufficientPlayers
			? 'text-yellow-400'
			: 'text-destructive';
	const accentBg = isPlayersWin
		? 'bg-green-400/15'
		: isInsufficientPlayers
			? 'bg-yellow-400/15'
			: 'bg-destructive/15';
	const accentBorder = isPlayersWin
		? 'border-green-400/50'
		: isInsufficientPlayers
			? 'border-yellow-400/50'
			: 'border-destructive/60';

	function handleClose() {
		if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
		setData(null);
	}

	return (
		<AnimatePresence>
			{data && (
				<>
					<motion.div
						key='backdrop'
						className={`fixed inset-0 z-50 ${
							isPlayersWin
								? 'bg-green-400/10'
								: isInsufficientPlayers
									? 'bg-yellow-400/10'
									: 'bg-destructive/20'
						}`}
						style={{ backdropFilter: 'blur(6px)' }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25 }}
					/>

					<motion.div
						key='card'
						className={`flex flex-col gap-6 items-center px-8 py-8 w-full max-w-md max-h-[85vh] overflow-y-auto bg-background z-99 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[1rem] border ${accentBorder}`}
						initial={{ opacity: 0, scale: 0.85, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.85, y: 20 }}
						transition={{
							type: 'spring',
							stiffness: 300,
							damping: 25,
						}}>
						<button
							onClick={handleClose}
							className='absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors'>
							<X size={18} />
						</button>

						<motion.div
							className={`flex items-center justify-center w-20 h-20 rounded-full ${accentBg} ${accent}`}
							initial={{ rotate: -10, scale: 0.8 }}
							animate={{ rotate: 0, scale: 1 }}
							transition={{
								type: 'spring',
								stiffness: 400,
								damping: 20,
								delay: 0.1,
							}}>
							{isPlayersWin ? (
								<Trophy size={40} />
							) : isInsufficientPlayers ? (
								<Users size={40} />
							) : (
								<Skull size={40} />
							)}
						</motion.div>

						<motion.div
							className='flex flex-col items-center text-center gap-1'
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.15 }}>
							<h1 className={`text-3xl font-bold ${accent}`}>
								{isPlayersWin
									? 'Players Win!'
									: isInsufficientPlayers
										? 'Game Stopped'
										: 'Imposters Win!'}
							</h1>
							<p className='text-sm text-muted-foreground'>
								{data.reason}
							</p>
						</motion.div>

						<motion.div
							className='w-full flex flex-col items-center gap-1 text-center'
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}>
							<h2 className='text-xs uppercase tracking-widest text-muted-foreground font-semibold'>
								Category
							</h2>
							<p className='text-lg font-semibold'>
								{data.category ?? '-'}
							</p>
							<h2 className='text-xs uppercase tracking-widest text-muted-foreground font-semibold mt-2'>
								The Word
							</h2>
							<p className='text-xl font-bold'>
								{data.word ?? '-'}
							</p>
						</motion.div>

						<div className='w-full h-px bg-border' />

						<motion.div
							className='w-full flex flex-col gap-3'
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.25 }}>
							<h2 className='text-xs uppercase tracking-widest text-muted-foreground font-semibold text-center'>
								{data.imposters.length > 1
									? 'The Imposters Were'
									: 'The Imposter Was'}
							</h2>

							{data.imposters.map((imp) => (
								<div
									key={imp.userId}
									className='flex flex-col gap-2 rounded-4xl border border-destructive/30 bg-destructive/5 p-3'>
									<div className='flex items-center justify-center gap-2'>
										<HatGlasses
											size={16}
											className='text-destructive shrink-0'
										/>
										<p className='font-semibold'>
											{imp.name}
										</p>
										{imp.wasEliminated && (
											<span className='text-xs px-2 py-0.5 rounded-full bg-destructive/20 text-destructive'>
												Eliminated
											</span>
										)}
									</div>

									<div className='flex flex-col gap-2 justify-around items-center'>
										<div className='flex flex-col items-center justify-center'>
											<p className='text-sm font-medium text-muted-foreground mb-1'>
												Hint given
											</p>
											<p className='text-md font-semibold'>
												{data.hint ?? 'No hint'}
											</p>
										</div>

										{imp.wordsByRound.length > 0 && (
											<div className='flex flex-col items-center justify-center'>
												<p className='text-sm font-medium text-muted-foreground mb-1'>
													Words submitted
												</p>
												<div className='flex flex-wrap gap-1'>
													{imp.wordsByRound.map(
														(entry) => (
															<div
																key={
																	entry.round
																}
																className='flex items-center gap-1 bg-background rounded px-2 py-0.5 border'>
																<span className='text-xs text-muted-foreground'>
																	R
																	{
																		entry.round
																	}
																</span>
																<span className='text-xs font-semibold'>
																	{entry.word ??
																		'-'}
																</span>
															</div>
														),
													)}
												</div>
											</div>
										)}
									</div>
								</div>
							))}
						</motion.div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
