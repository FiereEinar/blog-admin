import { fetchTopics } from '@/api/topic';
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

	const { data, error, isLoading } = useQuery({
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
					<Link
						className={`${navigationMenuTriggerStyle()} !w-64 hover:text-orange-500`}
						key={topic._id}
						to={`/topic/${topic._id}`}
					>
						{topic.title}
					</Link>
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
