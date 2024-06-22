import { fetchTopics } from '@/api/topic';
import { DefaultLoadingScreen } from '@/components/LoadingScreens';
import BlogForm from '@/components/forms/BlogForm';
import { MainContainer } from '@/components/ui/container';
import { useToast } from '@/components/ui/use-toast';
import useLoadingTracker from '@/hooks/useLoadingTracker';
import { useQuery } from '@tanstack/react-query';

export default function AddBlogPage() {
	const { toast } = useToast();

	const {
		data: topics,
		error: topicsError,
		isLoading: topicsLoading,
		refetch,
	} = useQuery({
		queryKey: ['topics'],
		queryFn: fetchTopics,
	});

	useLoadingTracker(topicsLoading, 3, () => {
		toast({
			title: 'Hang in there.',
			description:
				'The server is still waking up from its sleep, this would only take up to 20-30 seconds :)',
		});
	});

	if (topicsLoading) {
		return <DefaultLoadingScreen />;
	}

	if (topicsError) {
		return <h1>An error has occurred, please restart the application</h1>;
	}

	return (
		<MainContainer>
			<h1 className='text-2xl pb-5'>Add Blog</h1>

			<BlogForm mode='add' topics={topics} refetch={refetch} />
		</MainContainer>
	);
}
