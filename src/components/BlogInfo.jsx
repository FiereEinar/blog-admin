import { format } from 'date-fns';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

export default function BlogInfo({ blog }) {
	return (
		<section className='flex flex-col gap-3 max-w-[34rem] p-5 justify-center items-center border-b'>
			<div className='flex w-full justify-center gap-3'>
				<Button
					className='flex gap-1 justify-center items-center'
					size='sm'
					variant='ghost'
				>
					<img className='w-5 h-5' src='/delete.svg' alt='' />
					<p>Delete Blog</p>
				</Button>
				<Button
					className='flex gap-1 justify-center items-center'
					size='sm'
					variant='ghost'
				>
					<img className='w-5 h-5' src='/hide.svg' alt='' />
					<p>Hide Blog</p>
				</Button>
				<Link to={`/blog/${blog._id}/edit`}>
					<Button
						className='flex gap-1 justify-center items-center'
						size='sm'
						variant='ghost'
					>
						<img className='w-5 h-5' src='/edit.svg' alt='' />
						<p>Edit Blog</p>
					</Button>
				</Link>
			</div>
			<hr className='w-full' />
			<p className='text-muted-foreground'>
				{format(blog.dateAdded, 'MMMM dd, yyyy')}
			</p>
			<h1
				dangerouslySetInnerHTML={{ __html: blog.title }}
				className='text-2xl text-center font-semibold'
			/>
			<h4 className='text-xl'>{blog.topic.title}</h4>
			<img className='rounded-sm' src={blog.img.url} alt='blog image' />
			<p dangerouslySetInnerHTML={{ __html: blog.text }} />
		</section>
	);
}
