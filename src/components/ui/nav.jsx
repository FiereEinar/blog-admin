import { deleteTopic, fetchTopics } from '@/api/topic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	// NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from './navigation-menu';
import { socialLinks } from '@/constants';
import useLoadingTracker from '@/hooks/useLoadingTracker';
import { useToast } from './use-toast';
import { Button } from './button';
import DialogWrapper from '../DialogWrapper';

export function NavigationWrapper({ title, children }) {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>{title}</NavigationMenuTrigger>
					<NavigationMenuContent>{children}</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

export function NavTopics() {
	const { toast } = useToast();

	const { data, error, isLoading, refetch } = useQuery({
		queryKey: ['topics'],
		queryFn: fetchTopics,
	});

	useLoadingTracker(isLoading, 3, () => {
		toast({
			title: 'Hang in there.',
			description:
				'The server is still waking up from its sleep, this would only take up to 20-30 seconds :)',
		});
	});

	const deleteTopicHandler = async (topicId) => {
		try {
			const result = await deleteTopic(topicId);

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to delete topic',
					description: 'An error occured while deleting the topic',
				});
				return;
			}

			refetch();
			toast({
				description: 'Topic deleted successfully!',
			});
		} catch (err) {
			console.log('Error deleting topic', err);
			toast({
				variant: 'destructive',
				title: 'Failed to delete topic',
				description: 'An error occured while deleting the topic',
			});
		}
	};

	return (
		<NavigationWrapper title='Topics'>
			{isLoading && (
				<p className={`${navigationMenuTriggerStyle()} text-muted-foreground`}>
					Fetching topics...
				</p>
			)}
			{error && (
				<p className={`${navigationMenuTriggerStyle()} text-muted-foreground`}>
					Error fetching topics
				</p>
			)}
			{data &&
				data.map((topic) => (
					<div
						key={topic._id}
						className='relative flex justify-center items-center'
					>
						<Link
							className={`${navigationMenuTriggerStyle()} !w-64 hover:text-orange-500`}
							to={`/topic/${topic._id}`}
						>
							{topic.title}
						</Link>
						<DialogWrapper
							title='Delete Topic'
							description='Are you sure you want to delete this topic?'
							customConfirmBtn='Delete'
							confirmBtnVariant='destructive'
							onConfirm={() => deleteTopicHandler(topic._id)}
							trigger={
								<Button
									size='sm'
									variant='ghost'
									className='z-50 hover:bg-red-500 absolute right-1'
								>
									<img className='w-4 h-4' src='/delete.svg' alt='' />
								</Button>
							}
						/>
					</div>
				))}
		</NavigationWrapper>
	);
}

export function NavSocialLinks() {
	return (
		<NavigationWrapper title='Socials'>
			{socialLinks.map((link, i) => (
				<Link
					className={`${navigationMenuTriggerStyle()} !w-64 hover:text-orange-500`}
					key={i}
					target='_blank'
					to={link.path}
				>
					{link.name}
				</Link>
			))}
		</NavigationWrapper>
	);
}
