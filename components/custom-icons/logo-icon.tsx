import { motion, Variants } from 'framer-motion';

export default function LogoIcon() {
	const draw: Variants = {
		hidden: { pathLength: 0, opacity: 0 },
		visible: {
			pathLength: 1,
			opacity: 1,
			transition: {
				pathLength: {
					type: 'spring',
					delay: 0.15,
					duration: 2,
					bounce: 0,
				},
				opacity: { delay: 0, duration: 0.7 },
			},
		},
	};

	return (
		<motion.svg
			xmlns='http://www.w3.org/2000/svg'
			width='64'
			height='64'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			className='lucide lucide-hat-glasses-icon lucide-hat-glasses'
			initial='hidden'
			animate='visible'>
			<motion.path
				d='M14 18a2 2 0 0 0-4 0'
				variants={draw}
				custom={1}
			/>
			<motion.path
				d='m19 11-2.11-6.657a2 2 0 0 0-2.752-1.148l-1.276.61A2 2 0 0 1 12 4H8.5a2 2 0 0 0-1.925 1.456L5 11'
				variants={draw}
				custom={1}
			/>
			<motion.path
				d='M2 11h20'
				variants={draw}
				custom={1}
			/>
			<motion.circle
				cx='17'
				cy='18'
				r='3'
				variants={draw}
				custom={1}
			/>
			<motion.circle
				cx='7'
				cy='18'
				r='3'
				variants={draw}
				custom={1}
			/>
		</motion.svg>
	);
}
