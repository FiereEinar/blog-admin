import { Link } from 'react-router-dom';

export default function NotfoundPage() {
	return (
		<section className='flex justify-center items-center flex-col pt-36'>
			<h1 className=' text-6xl text-bold'>404</h1>
			<h4 className='text-2xl'>Not Found</h4>
			<p>Oppps... Looks like you&apos;re lost baby girl.</p>
			<p>
				Go back to the
				<Link to='/'>
					<span className='italic underline'> Home Page</span>
				</Link>
			</p>
		</section>
	);
}
