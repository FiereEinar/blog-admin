import { Button } from '@/components/ui/button';
import { InputField } from '../ui/inputField';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { getUserById, updateUserById } from '@/api/user';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { userUpdateSchema } from '@/utils/validations/userSchema';

import { useToast } from '@/components/ui/use-toast';
import { ProfileSheetLoadingScreen } from '../LoadingScreens';
import { getUserIdFromLocalStorage } from '@/utils/localstorage';

export default function ProfileForm() {
	const { toast } = useToast();
	const [profileImage, setProfileImage] = useState(null);

	const userId = getUserIdFromLocalStorage();

	const {
		data: userData,
		error,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: [`user_data_${userId}`],
		queryFn: () => getUserById(userId),
	});

	const [profileImagePreview, setProfileImagePreview] = useState(
		userData?.profile?.imgUrl || '/default_user.jpg'
	);

	const {
		register,
		handleSubmit,
		setError,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(userUpdateSchema),
	});

	// set the default values of the form when done fetching
	useEffect(() => {
		if (userData) {
			setValue('firstName', userData.firstName);
			setValue('lastName', userData.lastName);
			setValue('email', userData.email);
			setProfileImagePreview(userData.profile.imgUrl || '/default_user.jpg');
		}

		if (error) {
			setError('root', { message: 'Failed to fetch user data.' });
		}
	}, [userData, setValue, error, setError]);

	const onProfileSubmit = async (formData) => {
		try {
			const data = new FormData();

			// convert the data to a form data so that it can be sent as 'multipart/form-data'
			if (profileImage) data.append('profileImg', profileImage);
			data.append('firstName', formData.firstName);
			data.append('lastName', formData.lastName);
			data.append('email', formData.email);

			const response = await updateUserById(data, userId);

			if (!response.ok) {
				setError('root', { message: 'Failed to update user data.' });
				toast({
					variant: 'destructive',
					description: 'Failed to update user data.',
				});
				return;
			}

			toast({
				description: 'Your changes have been saved.',
			});
			refetch();
		} catch (err) {
			setError('root', { message: err.message });
		}
	};

	return (
		<>
			{isLoading && <ProfileSheetLoadingScreen />}
			{!isLoading && (
				<form
					encType='multipart/form-data'
					onSubmit={handleSubmit(onProfileSubmit)}
					className='py-5 flex flex-col gap-2'
				>
					<img
						className='w-24 h-24 rounded-md object-cover object-center'
						src={profileImagePreview}
						alt=''
					/>

					<InputField
						register={{ ...register('profileImg') }}
						error={errors.profileImg}
						onChange={(e) => {
							setProfileImage(e.target.files[0]);
						}}
						accept='image/*'
						type='file'
						id='profileImg'
						label='Profile photo:'
					/>

					<InputField
						register={{ ...register('firstName') }}
						error={errors.firstName}
						type='text'
						id='firstName'
						label='Firstname:'
					/>

					<InputField
						register={{ ...register('lastName') }}
						error={errors.lastName}
						type='text'
						id='lastName'
						label='Lastname:'
					/>

					<InputField
						register={{ ...register('email') }}
						error={errors.email}
						type='email'
						id='email'
						label='Email:'
					/>

					{errors.root && (
						<p className='text-red-500 text-sm'>{errors.root.message}</p>
					)}

					<Button
						disabled={isSubmitting}
						className='w-fit self-end'
						size='sm'
						type='submit'
					>
						{isSubmitting ? 'Saving...' : 'Save changes'}
					</Button>
				</form>
			)}
		</>
	);
}
