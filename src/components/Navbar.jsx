import { navlinks } from '@/constants';
import { NavLink } from 'react-router-dom';
import { navigationMenuTriggerStyle } from './ui/navigation-menu';
import { NavSocialLinks, NavTopics } from './ui/nav';

export default function Navbar() {
	return (
		<nav className='w-full border-b p-3 flex justify-center items-center gap-5 flex-wrap'>
			{navlinks.map((link, i) => (
				<NavLink to={link.path} key={i} className={navlinkClassCallback}>
					<p>{link.name}</p>
				</NavLink>
			))}
			<NavSocialLinks />
			<NavTopics />
		</nav>
	);
}

const navlinkClassCallback = ({ isActive, isPending }) => {
	const shadcnClass = navigationMenuTriggerStyle();
	const navlinkClass = isPending
		? 'text-gray-500'
		: isActive
		? 'text-orange-500'
		: '';

	return `${navlinkClass} ${shadcnClass} hover:text-orange-500`;
};
