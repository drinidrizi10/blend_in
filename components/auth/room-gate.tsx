'use client';

import Link from 'next/link';
import { useRoom } from '../providers/room-provider';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

export function RoomGate({ children }: { children: React.ReactNode }) {
	const { joinState, error } = useRoom();
	const { user, isLoaded, isSignedIn } = useUser();
	const router = useRouter();

	useEffect(() => {
		if (!isLoaded) return;
		if (!isSignedIn || !user) router.replace('/sign-in');
	}, [isLoaded, isSignedIn, router, user]);

	if (!isLoaded) {
		return (
			<div className='flex h-screen items-center justify-center'>
				<p className='text-2xl font-semibold'>Loading…</p>
			</div>
		);
	}

	if (!isSignedIn || !user) return null;

	if (joinState === 'connecting' || joinState === 'joining') {
		return (
			<div className='flex h-screen items-center justify-center'>
				<p className='text-2xl font-semibold'>Joining room…</p>
			</div>
		);
	}

	if (joinState === 'error') {
		return (
			<div className='flex h-screen flex-col items-center justify-center gap-4'>
				<p className='text-2xl font-semibold'>{error}</p>
				<Link href='/'>
					<Button>Go Home</Button>
				</Link>
			</div>
		);
	}

	return <>{children}</>;
}
