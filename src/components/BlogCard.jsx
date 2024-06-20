import { determineReadtime } from '@/lib/utils';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function BlogCard({ blog }) {
	return (
		<article className='transition-all border w-80 rounded-md text-muted-foreground hover:shadow-lg hover:border-gray-300 hover:-translate-y-1'>
			<Link
				className='w-full h-full p-3 flex flex-col gap-1 justify-between'
				to={`/blog/${blog._id}`}
				key={blog._id}
			>
				<img
					className='w-full h-40 object-cover object-center rounded-sm'
					src={blog.img.url}
					alt=''
				/>
				<h4 className='text-md font-medium text-black'>{blog.topic.title}</h4>
				<p className='text-xs italic'>
					Read time: {determineReadtime(blog.text)} minutes
				</p>
				<h4 className='text-xl  text-black'>{blog.title}</h4>
				<p className='text-xs italic'>
					{format(blog.dateAdded, 'MMMM dd, yyyy')}
				</p>
				<div className='flex justify-start mt-2 items-center gap-2'>
					<img className='w-6 h-6' src='/comment-icon-2.svg' alt='comment' />
					<p>{blog.comments.length}</p>
				</div>
			</Link>
		</article>
	);
}
