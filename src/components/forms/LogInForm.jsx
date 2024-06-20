import { postSignIn } from '@/api/user';
import useLoadingTracker from '@/hooks/useLoadingTracker';
import { userLoginSchema } from '@/utils/validations/userSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { InputField } from '../ui/inputField';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import {
	setTokenFromLocalStorage,
	setUserIdFromLocalStorage,
} from '@/utils/localstorage';

export default function LogInForm() {
	const { toast } = useToast();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: zodResolver(userLoginSchema) });

	useLoadingTracker(isSubmitting, 3, () => {
		toast({
			title: 'Hang in there.',
			description:
				'The server is still waking up from its sleep, this would only take up to 20-30 seconds :)',
		});
	});

	const onFormSubmit = async (data) => {
		try {
			const result = await postSignIn(data);

			if (!result.token) {
				setError('root', { message: result.message });
			} else {
				setUserIdFromLocalStorage('Token', `Bearer ${result.token}`);
				setTokenFromLocalStorage('UserId', result.userId);
				navigate('/');
			}
		} catch (err) {
			setError('root', { message: err.message });
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onFormSubmit)}
			className='md:w-[31rem] w-[22rem] border p-5 rounded-md shadow-md flex flex-col gap-2'
		>
			<InputField
				type='email'
				id='email'
				label='Email:'
				register={{ ...register('email') }}
				error={errors.email}
			/>
			<InputField
				type='password'
				id='password'
				label='Password:'
				register={{ ...register('password') }}
				error={errors.password}
			/>
			<p className=' text-muted-foreground italic text-sm'>
				Already have an account?
				<Link className='underline' to='/signup'>
					{' '}
					Sign up
				</Link>
			</p>

			<div className='flex w-full justify-end'>
				<Button disabled={isSubmitting} type='submit' size='sm'>
					{isSubmitting ? 'Loading...' : 'Submit'}
				</Button>
			</div>
			{errors.root && (
				<p className='text-red-500 text-sm'>{errors.root.message}</p>
			)}
		</form>
	);
}
