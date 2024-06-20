import useAuth from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export default function LandingPageCard() {
	const isLoggedIn = useAuth();

	return (
		<section className='relative flex justify-center items-center max-w-[55rem] h-fit p-10 flex-wrap md:flex-nowrap shadow-xl border rounded-lg text-center md:text-start bg-white'>
			<div className='h-fit'>
				<h1 className='text-3xl pb-1 font-medium'>
					Welcome to <span className='text-orange-500'>Blogs</span>.Daily!
				</h1>
				<p className=' text-wrap text-center md:text-start'>
					A place to <span className='text-orange-500'>explore</span> diverse
					blogs and engage in discussions with fellow readers.{' '}
					<span className='text-orange-500'>Enjoy</span> your reading
					experience!
				</p>
				{!isLoggedIn && (
					<p className='my-1 text-wrap text-center md:text-start'>
						<span className='text-orange-500'>Sign up now</span> and discover
						more user features!
					</p>
				)}
				<div className='flex gap-2 pt-2 justify-center md:justify-start'>
					{!isLoggedIn && (
						<Link to='/signup'>
							<Button size='sm'>Sign up</Button>
						</Link>
					)}
					<Link to='/blogs'>
						<Button size='sm' variant='ghost'>
							Start reading
							<img src='/arrow.svg' alt='' />
						</Button>
					</Link>
				</div>
			</div>

			<img
				className='md:w-[28rem] w-[20rem]'
				src='/landing-page-img.png'
				alt=''
			/>
		</section>
	);
}
