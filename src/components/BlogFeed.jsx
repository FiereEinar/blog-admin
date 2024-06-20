import BlogCard from './BlogCard';

export function BlogFeed({ blogs }) {
	return (
		<section className='flex w-full gap-3 flex-wrap justify-center items-stretch'>
			{blogs.length === 0 && (
				<p className='italic text-muted-foreground'>No blogs available</p>
			)}
			{blogs.map((blog) => (
				<BlogCard key={blog._id} blog={blog} />
			))}
		</section>
	);
}
