import { getTokenFromLocalStorage } from '@/utils/localstorage';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ui/use-toast';

export default function ProtectedRoute({ children }) {
	const { toast } = useToast();
	const navigate = useNavigate();

	useEffect(() => {
		const bearerToken = getTokenFromLocalStorage();

		if (bearerToken === null) {
			toast({
				variant: 'destructive',
				title: 'No user found',
				description: 'Please log in first to proceed.',
			});
			navigate('/login', { replace: true });
			return;
		}

		const token = bearerToken.split(' ')[1];
		const userData = jwtDecode(token).user;

		if (!userData.author) {
			toast({
				variant: 'destructive',
				title: 'Unauthorized',
				description: 'You are not allowed in this page',
			});
			navigate('/login', { replace: true });
			return;
		}
	}, [navigate, toast]);

	return children;
}
