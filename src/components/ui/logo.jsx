import { Link } from 'react-router-dom';

export function Logo() {
	return (
		<Link to='/'>
			<div className='flex items-center justify-start gap-2'>
				<img className=' w-10 h-10 rounded-full' src='/blog-logo.png' alt='' />
				<h4 className='text-2xl'>
					<span className=' text-orange-500'>Blogs</span>.Daily
				</h4>
			</div>
		</Link>
	);
}
