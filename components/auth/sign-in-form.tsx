'use client';

import { useState } from 'react';
import { useSignIn } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import GoogleIcon from '@/components/custom-icons/google-icon';

export function SignInForm() {
	const { signIn, fetchStatus } = useSignIn();
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const isLoading = fetchStatus === 'fetching';

	async function handleGoogleSignIn() {
		setErrorMsg(null);

		const { error } = await signIn.sso({
			strategy: 'oauth_google',
			redirectCallbackUrl: '/sso-callback',
			redirectUrl: '/',
		});

		if (error) {
			setErrorMsg('Something went wrong. Please try again.');
		}
	}

	return (
		<div className='flex h-full w-full items-center justify-center bg-background px-4'>
			<Card className='w-full max-w-md'>
				<CardHeader className='text-center'>
					<CardTitle className='text-2xl font-semibold'>
						Welcome back
					</CardTitle>
					<CardDescription>
						Sign in to start playing{' '}
						<span className='text-primary font-semibold'>
							Blend In
						</span>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='space-y-4'>
						{errorMsg && (
							<Alert variant='destructive'>
								<AlertDescription>{errorMsg}</AlertDescription>
							</Alert>
						)}

						<Button
							variant='outline'
							className='w-full'
							onClick={handleGoogleSignIn}
							disabled={isLoading}>
							{isLoading ? (
								<Loader2 className='h-4 w-4 animate-spin' />
							) : (
								<GoogleIcon />
							)}
							Continue with Google
						</Button>

						<p className='text-center text-sm text-muted-foreground'>
							Don&apos;t have an account?{' '}
							<Link
								href='/sign-up'
								className='font-medium text-foreground underline underline-offset-4'>
								Sign Up
							</Link>
						</p>
					</div>

					{/* <div
						id='clerk-captcha'
						data-cl-theme='auto'
						data-cl-size='flexible'
					/> */}
				</CardContent>
			</Card>
		</div>
	);
}
