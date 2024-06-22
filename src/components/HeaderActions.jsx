import useAuth from '@/hooks/useAuth';
import {
	removeTokenFromLocalStorage,
	removeUserIdFromLocalStorage,
} from '@/utils/localstorage';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import ProfileSheet from './ProfileSheet';
import AddTopicForm from './forms/AddTopicForm';

export default function HeaderActions() {
	const isLoggedIn = useAuth();
	const navigate = useNavigate();

	const onLogout = () => {
		removeTokenFromLocalStorage();
		removeUserIdFromLocalStorage();
		navigate('/login');
	};

	return (
		<div className='flex gap-3'>
			{isLoggedIn ? (
				<>
					{/* Add Topic */}
					<AddTopicForm />

					{/* Add Blog */}
					<Link to='/blog/add'>
						<Button variant='ghost' className='md:px-8 flex gap-1' size='sm'>
							<img className='w-5 h-5' src='/add.svg' alt='' />
							<span className='sm:flex hidden'>Add Blog</span>
						</Button>
					</Link>

					{/* Logout */}
					<Button
						variant='ghost'
						className='md:px-8 flex gap-1'
						onClick={onLogout}
						size='sm'
					>
						<img className='w-5 h-5' src='/logout.svg' alt='' />
						<span className='sm:flex hidden'>Log out</span>
					</Button>

					{/* User Profile Sheet */}
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
	);
}
