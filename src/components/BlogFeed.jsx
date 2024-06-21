import BlogCard from './BlogCard';

export function BlogFeed({ blogs }) {
	const blogsList = blogs.filter((blog) => blog.published === true);

	return (
		<section className='flex w-full gap-3 flex-wrap justify-center items-stretch'>
			{blogsList.length === 0 && (
				<p className='italic text-muted-foreground'>No blogs available</p>
			)}
			{blogsList.map((blog) => (
				<BlogCard key={blog._id} blog={blog} />
			))}
		</section>
	);
}
