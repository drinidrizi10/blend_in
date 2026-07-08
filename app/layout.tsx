import type { Metadata } from 'next';
import { Geist, Geist_Mono, Outfit, Noto_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import Header from '@/components/parts/header';

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
							<Header />
							<div className='bg-background w-full flex-1 min-h-0 flex flex-col items-center p-4'>
								{children}
							</div>
						</ClerkProvider>
					</TooltipProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
