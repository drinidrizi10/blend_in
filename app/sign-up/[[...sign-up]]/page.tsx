import { SignUp } from '@clerk/nextjs';

export default function Page() {
	return (
		<div className='flex w-ful h-full items-center justify-center'>
			<SignUp signInUrl='/sign-in' />
		</div>
	);
}
