import { Button } from './ui/button';

export default function Footer() {
	return (
		<footer className='bg-gray-200 p-4 text-center'>
			<div className='max-w-md mx-auto p-4'>
				<div className='flex justify-center items-center gap-2'>
					<p className='text-sm'>
						&copy; 2024 <span className='text-orange-500'>Blogs</span>.Daily
					</p>
					<a href='https://github.com/FiereEinar' target='_blank'>
						<img
							className='transition-all duration-1000 w-8 h-8 rounded-full hover:rotate-[720deg]'
							src='/github.png'
							alt=''
						/>
					</a>
				</div>
				<ul className='flex justify-center mb-0'>
					<li>
						<Button variant='link'>Contact</Button>
					</li>
					<li>
						<Button variant='link'>Terms of Use</Button>
					</li>
					<li>
						<Button variant='link'>About</Button>
					</li>
				</ul>
			</div>
		</footer>
	);
}
