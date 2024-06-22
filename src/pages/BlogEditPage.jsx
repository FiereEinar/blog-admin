import { fetchBlogs } from '@/api/blog';
import { fetchTopics } from '@/api/topic';
import { DefaultLoadingScreen } from '@/components/LoadingScreens';
import BlogForm from '@/components/forms/BlogForm';
import { MainContainer } from '@/components/ui/container';
import { useToast } from '@/components/ui/use-toast';
import useLoadingTracker from '@/hooks/useLoadingTracker';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function BlogEditPage() {
	const { toast } = useToast();
	const { blogId } = useParams();
	let blog = null;

	const {
		data: blogs,
		error: blogsError,
		isLoading: blogsLoading,
	} = useQuery({
		queryKey: ['blogs'],
		queryFn: fetchBlogs,
	});

	const {
		data: topics,
		error: topicsError,
		isLoading: topicsLoading,
		refetch,
	} = useQuery({
		queryKey: ['topics'],
		queryFn: fetchTopics,
	});

	if (blogs) blog = blogs.find((x) => x._id === blogId);

	useLoadingTracker(blogsLoading, 3, () => {
		toast({
			title: 'Hang in there.',
			description:
				'The server is still waking up from its sleep, this would only take up to 20-30 seconds :)',
		});
	});

	if (blogsLoading || topicsLoading) {
		return <DefaultLoadingScreen />;
	}

	if (blogsError || topicsError) {
		return <h1>An error has occurred, please restart the application</h1>;
	}

	return (
		<MainContainer>
			<h1 className='text-2xl pb-5'>Edit Blog</h1>

			<BlogForm mode='edit' blog={blog} topics={topics} refetch={refetch} />
		</MainContainer>
	);
}
