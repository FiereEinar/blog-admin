import { format } from 'date-fns';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import DialogWrapper from './Dialog';
import { useToast } from './ui/use-toast';
import { deleteBlog } from '@/api/blog';

export default function BlogInfo({ blog, refetch }) {
	const { toast } = useToast();
	const navigate = useNavigate();

	const onDeleteHandler = async (id) => {
		try {
			const result = await deleteBlog(id);

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Error deleting blog',
					description: 'An error has occured while deleting blog',
				});
				return;
			}

			toast({
				description: 'Blog deleted successfully!',
			});
			refetch();
			navigate('/blogs');
		} catch (err) {
			console.error('Error deleting comment. ', err);
			toast({
				variant: 'destructive',
				title: 'Error deleting blog',
				description: 'An error has occured while deleting blog',
			});
		}
	};

	return (
		<section className='flex flex-col gap-3 max-w-[34rem] p-5 justify-center items-center border-b'>
			<div className='flex w-full justify-center gap-3'>
				<DialogWrapper
					onConfirm={() => onDeleteHandler(blog._id)}
					confirmBtnVariant='destructive'
					title='Confirm blog deletion'
					description='Are you sure you want to delete this blog? This action can not be undone.'
					trigger={
						<Button
							className='flex gap-1 justify-center items-center'
							size='sm'
							variant='ghost'
						>
							<img className='w-5 h-5' src='/delete.svg' alt='' />
							<p>Delete Blog</p>
						</Button>
					}
				/>

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
