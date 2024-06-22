import { Logo } from './ui/logo';
import HeaderActions from './HeaderActions';

export default function Header() {
	return (
		<nav className='w-full border-b p-3 flex justify-between items-center md:px-10'>
			<Logo />
			<HeaderActions />
		</nav>
	);
}
