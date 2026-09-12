import type { Metadata } from 'next';
import { Geist, Geist_Mono, Outfit, Noto_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import Header from '@/components/ui/parts/header';
import { SocketProvider } from '@/components/providers/socket-provider';
import { Toaster } from '@/components/ui/toast';
import Link from 'next/link';

const notoSansHeading = Noto_Sans({
	subsets: ['latin'],
	variable: '--font-heading',
});

const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Blend In',
	description: 'Find the Imposter!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
			className={cn(
				'h-full',
				'antialiased',
				geistSans.variable,
				geistMono.variable,
				'font-sans',
				outfit.variable,
				notoSansHeading.variable,
			)}>
			<body
				suppressHydrationWarning
				className='h-full flex flex-col'>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange>
					<TooltipProvider>
						<ClerkProvider>
							<SocketProvider>
								<Header />
								<div className='bg-background w-full flex-1 min-h-0 flex flex-col items-center'>
									{children}

									<footer className='w-full bg-card border-t border-border py-4'>
										<div className='w-full px-4 md:w-3/4 md:px-0 mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-muted-foreground'>
											<p>
												&copy;{' '}
												{new Date().getFullYear()} Blend
												In. All rights reserved.
											</p>
											<p>
												Contact:{' '}
												<span className='font-bold'>
													drinidrizi9@gmail.com
												</span>
											</p>
											<nav className='flex items-center gap-4'>
												<Link
													href='/privacy-policy'
													className='hover:text-foreground transition-colors'>
													Privacy Policy
												</Link>
												<Link
													href='/terms-of-use'
													className='hover:text-foreground transition-colors'>
													Terms of Use
												</Link>
											</nav>
										</div>
									</footer>
								</div>
								<div
									id='clerk-captcha'
									data-cl-theme='auto'
									data-cl-size='compact'
									className='fixed bottom-4 left-1/2 -translate-x-1/2 z-50 empty:hidden'
								/>
								<Toaster />
							</SocketProvider>
						</ClerkProvider>
					</TooltipProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
