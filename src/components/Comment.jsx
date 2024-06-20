import useAuth from '@/hooks/useAuth';
import { Button } from './ui/button';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { userCommentSchema } from '@/utils/validations/userSchema';
import { deleteComment, postEditComment } from '@/api/comment';
import { useParams } from 'react-router-dom';
import { useToast } from './ui/use-toast';
import { getUserIdFromLocalStorage } from '@/utils/localstorage';

/**
 * CommentEditForm will handle the form for editing a comment
 * CommentInfo will handle the deletion of a comment
 */
export function Comment(props) {
	const [editMode, setEditMode] = useState(false);

	return (
		<>
			{editMode ? (
				<CommentEditForm
					{...props}
					editMode={editMode}
					setEditMode={setEditMode}
				/>
			) : (
				<CommentInfo {...props} editMode={editMode} setEditMode={setEditMode} />
			)}
		</>
	);
}

function CommentModeSwitcher({ editMode, setEditMode, ...rest }) {
	return (
		<Button
			{...rest}
			type='button'
			onClick={() => setEditMode((prevMode) => !prevMode)}
			size='sm'
			variant='ghost'
			className='transition-all size-8 rounded-full p-[6px] hover:bg-gray-200 '
		>
			<img src={!editMode ? '/edit.svg' : '/close.svg'} alt='edit' />
		</Button>
	);
}

/**
 * should only be used inside a blog details page that has the blogId in the params
 * because it relies on that blogId to update the comment
 */
function CommentEditForm({
	author,
	text,
	imgURL,
	refetch,
	date,
	commentId,
	commenterId,
	editMode,
	setEditMode,
}) {
	const currentUserId = getUserIdFromLocalStorage();
	const isLoggedIn = useAuth();
	const { blogId } = useParams();
	const { toast } = useToast();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(userCommentSchema),
		defaultValues: {
			text: text,
		},
	});

	const onCommentEditSubmit = async (data) => {
		try {
			const result = await postEditComment(data, commentId, blogId);

			if (!result.success) {
				toast({
					variant: 'destructive',
					description: 'Error editing comment.',
				});
				return setError('text', { message: 'Error editing comment.' });
			}

			setEditMode((prevMode) => !prevMode);
			refetch();
			toast({
				description: 'Comment edited successfully!',
			});
		} catch (err) {
			setError('root', { message: 'Error editing comment.' });
			console.error(err);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onCommentEditSubmit)}
			className='flex flex-col gap-3 text-sm border-t p-3 w-full'
		>
			<div className='flex justify-between'>
				<CommentUserHeader author={author} date={date} imgURL={imgURL} />
				{isLoggedIn && commenterId === currentUserId && (
					<CommentControlWrapper>
						<CommentModeSwitcher
							disabled={isSubmitting}
							editMode={editMode}
							setEditMode={setEditMode}
						/>

						<Button
							disabled={isSubmitting}
							type='submit'
							size='sm'
							variant='ghost'
							className='transition-all size-8 rounded-full p-[6px] hover:bg-gray-200 '
						>
							<img src='/check.svg' alt='delete' />
						</Button>
					</CommentControlWrapper>
				)}
			</div>
			{errors.text && (
				<p className='text-red-500 text-sm'>{errors.text.message}</p>
			)}
			<textarea
				className='p-1'
				disabled={isSubmitting}
				{...register('text')}
				rows={5}
				autoFocus
			></textarea>
		</form>
	);
}

/**
 * should only be used inside a blog details page that has the blogId in the params
 * because it relies on that blogId to update the comment
 */
function CommentInfo({
	author,
	text,
	imgURL,
	refetch,
	date,
	commentId,
	commenterId,
	editMode,
	setEditMode,
}) {
	const currentUserId = getUserIdFromLocalStorage();
	const isLoggedIn = useAuth();
	const { toast } = useToast();
	const { blogId } = useParams();
	const [isLoading, setIsLoading] = useState(false);

	const onDelete = async (e) => {
		try {
			e.preventDefault();
			if (editMode) return;
			setIsLoading(true);

			const result = await deleteComment(commentId, blogId);

			if (!result.success) {
				toast({
					variant: 'destructive',
					description: 'Error deleting comment.',
				});
				console.log(result);
				return;
			}

			refetch();
			toast({
				description: 'Comment deleted successfully!',
			});
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<article className='relative flex flex-col gap-3 text-sm border-t p-3 w-full'>
			<div className='flex justify-between'>
				<CommentUserHeader author={author} date={date} imgURL={imgURL} />

				{isLoggedIn && commenterId === currentUserId && (
					<CommentControlWrapper>
						<CommentModeSwitcher
							disabled={isLoading}
							editMode={editMode}
							setEditMode={setEditMode}
						/>

						<Button
							disabled={isLoading}
							type='button'
							onClick={onDelete}
							size='sm'
							variant='ghost'
							className='transition-all size-8 rounded-full p-[6px] hover:bg-gray-200 '
						>
							<img src='/delete.svg' alt='delete' />
						</Button>
					</CommentControlWrapper>
				)}
			</div>
			<p>{text}</p>
		</article>
	);
}

function CommentControlWrapper({ children }) {
	return (
		<div className='flex gap-2 justify-center items-center'>{children}</div>
	);
}

function CommentUserHeader({ author, imgURL, date }) {
	return (
		<div className='flex gap-3'>
			<img
				className='w-9 h-9 rounded-full border object-cover object-center'
				src={imgURL || '/default_user.jpg'}
				alt='profile'
			/>
			<div>
				<h4 className=' font-medium'>{author}</h4>
				<p className=' text-xs italic'>{date}</p>
			</div>
		</div>
	);
}
