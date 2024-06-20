import { fetchTopics } from '@/api/topic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from './navigation-menu';
import { socialLinks } from '@/constants';

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
	const { data, error, isLoading } = useQuery({
		queryKey: ['topics'],
		queryFn: fetchTopics,
	});

	return (
		<NavigationWrapper title='Topics'>
			{isLoading && <p className='text-muted-foreground'>Fetching topics...</p>}
			{error && <p className='text-muted-foreground'>Error fetching topics</p>}
			{data &&
				data.map((topic) => (
					<Link key={topic._id} to={`/topic/${topic._id}`}>
						<NavigationMenuLink
							className={`${navigationMenuTriggerStyle()} !w-64 hover:text-orange-500`}
						>
							{topic.title}
						</NavigationMenuLink>
					</Link>
				))}
		</NavigationWrapper>
	);
}

export function NavSocialLinks() {
	return (
		<NavigationWrapper title='Socials'>
			{socialLinks.map((link, i) => (
				<Link key={i} target='_blank' to={link.path}>
					<NavigationMenuLink
						className={`${navigationMenuTriggerStyle()} !w-64 hover:text-orange-500`}
					>
						{link.name}
					</NavigationMenuLink>
				</Link>
			))}
		</NavigationWrapper>
	);
}
