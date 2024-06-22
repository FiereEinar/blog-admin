import { fetchBlogs } from '@/api/blog';
import BlogInfo from '@/components/BlogInfo';
import CommentSection from '@/components/CommentSection';
import { DefaultLoadingScreen } from '@/components/LoadingScreens';
import { toast } from '@/components/ui/use-toast';
import useLoadingTracker from '@/hooks/useLoadingTracker';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function BlogDetailsPage() {
	const { blogId } = useParams();
	let blog = null;

	const { data, error, isLoading, refetch } = useQuery({
		queryKey: ['blogs'],
		queryFn: fetchBlogs,
	});

	useLoadingTracker(isLoading, 3, () => {
		toast({
			title: 'Hang in there.',
			description:
				'The server is still waking up from its sleep, this would only take up to 20-30 seconds :)',
		});
	});

	if (data) blog = data.find((x) => x._id === blogId);

	if (isLoading) {
		return <DefaultLoadingScreen />;
	}

	if (error) {
		return <p>An error has occured, please restart the application</p>;
	}

	return (
		<main className='flex justify-center flex-wrap gap-10'>
			<BlogInfo blog={blog} refetch={refetch} />
			<CommentSection comments={blog.comments} refetch={refetch} />
		</main>
	);
}
