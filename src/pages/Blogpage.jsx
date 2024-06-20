import { useQuery } from '@tanstack/react-query';
import { fetchBlogs } from '@/api/blog';
import { BlogPageLoadingScreen } from '@/components/LoadingScreens';
import { useToast } from '@/components/ui/use-toast';
import useLoadingTracker from '@/hooks/useLoadingTracker';
import { BlogFeed } from '@/components/BlogFeed';
import { MainContainer } from '@/components/ui/container';

export default function Blogpage() {
	const { toast } = useToast();

	const { data, error, isLoading } = useQuery({
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

	if (isLoading) {
		return <BlogPageLoadingScreen />;
	}

	if (error) {
		return <h1>An error has occurred, please restart the application</h1>;
	}

	return (
		<MainContainer>
			<BlogFeed blogs={data} />
		</MainContainer>
	);
}
