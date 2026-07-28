import { Show, UserButton } from '@clerk/nextjs';
import { Button } from '../button';
import Link from 'next/link';

export default function Header() {
	return (
		<header className='flex w-full h-16 bg-card items-center justify-center'>
			<div className='flex w-full px-4 md:w-3/4 md:px-0 items-center justify-between'>
				<div className='flex items-center justify-center'>
					<Link
						href='/'
						className='text-primary font-bold text-3xl'>
						{' '}
						Blend In
					</Link>
				</div>
				<div className='flex items-center gap-4'>
					<Show when='signed-out'>
						<Link href='/sign-in'>
							<Button
								variant='default'
								size='lg'>
								Sign In
							</Button>
						</Link>
					</Show>
					<Show when='signed-in'>
						<UserButton />
					</Show>
				</div>
			</div>
		</header>
	);
}
