import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Logo } from './ui/logo';
import ProfileSheet from './ProfileSheet';
import useAuth from '@/hooks/useAuth';
import {
	removeTokenFromLocalStorage,
	removeUserIdFromLocalStorage,
} from '@/utils/localstorage';

export default function Header() {
	const isLoggedIn = useAuth();
	const navigate = useNavigate();

	const onLogout = () => {
		removeTokenFromLocalStorage();
		removeUserIdFromLocalStorage();
		navigate('/login');
	};

	return (
		<nav className='w-full border-b p-3 flex justify-between items-center md:px-10'>
			<Logo />

			<div className='flex gap-3'>
				{isLoggedIn ? (
					<>
						<Link to='/blog/add'>
							<Button variant='ghost' className='md:px-8 flex gap-1' size='sm'>
								<img className='w-5 h-5' src='/add.svg' alt='' />
								<span className='sm:flex hidden'>Add Blog</span>
							</Button>
						</Link>
						<Button
							variant='ghost'
							className='md:px-8 flex gap-1'
							onClick={onLogout}
							size='sm'
						>
							<img className='w-5 h-5' src='/logout.svg' alt='' />
							<span className='sm:flex hidden'>Log out</span>
						</Button>
						<ProfileSheet />
					</>
				) : (
					<>
						<Link to='/login'>
							<Button className='md:px-8' size='sm' variant='ghost'>
								Log in
							</Button>
						</Link>
						<Link className='sm:flex hidden' to='/signup'>
							<Button className='md:px-8' size='sm'>
								Sign up
							</Button>
						</Link>
					</>
				)}
			</div>
		</nav>
	);
}
