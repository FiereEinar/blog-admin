import { format } from 'date-fns';

export default function BlogInfo({ blog }) {
	return (
		<section className='flex flex-col gap-3 max-w-[34rem] p-5 justify-center items-center border-b'>
			<p className='text-muted-foreground'>
				{format(blog.dateAdded, 'MMMM dd, yyyy')}
			</p>
			<h1 className='text-2xl text-center font-semibold'>{blog.title}</h1>
			<h4 className='text-xl'>{blog.topic.title}</h4>
			<img className='rounded-sm' src={blog.img.url} alt='blog image' />
			<p>{blog.text}</p>
		</section>
	);
}
