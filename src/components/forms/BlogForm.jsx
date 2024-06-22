import { updateBlog } from '@/api/blog';
import { blogSchema } from '@/utils/validations/blogSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../ui/use-toast';
import { Button } from '../ui/button';
import { InputField } from '../ui/inputField';
import { Editor } from '@tinymce/tinymce-react';
import { editorSettings } from '@/constants';

/**
 *
 * @param {string} mode either 'edit' or 'add'
 * @returns a form for adding or editing a blog
 */
export default function BlogForm({ mode, blog, topics, refetch }) {
	const { toast } = useToast();
	const { blogId } = useParams();
	const navigate = useNavigate();
	const [blogImage, setBlogImage] = useState(null);
	const textEditorRef = useRef(null);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(blogSchema),
	});

	const onFormSubmit = async (data) => {
		try {
			// blogs should have an image attached
			if (blogImage === null && mode === 'add') {
				setError('blogImage', {
					message: 'Please put an image for your blog.',
				});
				return;
			}

			const formData = new FormData();

			formData.append('text', textEditorRef.current.getContent());
			formData.append('title', data.title);
			formData.append('topicId', data.topicId);
			formData.append('published', data.published);
			if (blogImage) formData.append('blogImage', blogImage);

			const result = await updateBlog(blogId, formData);

			if (!result.success) {
				setError('root', { message: 'Error updating blog.' });
				toast({
					variant: 'destructive',
					title: 'Error updating blog',
					description: 'Failed to update blog',
				});
				return;
			}

			toast({
				description: 'Blog updated successfully!',
			});
			refetch();
			navigate(`/blog/${blogId}`);
		} catch (err) {
			console.error('Error editing blog.', err);
			setError('root', { message: 'Error updating blog.' });
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onFormSubmit)}
			className='flex flex-col border rounded-md shadow-lg gap-3'
		>
			{/* form button actions */}
			<section className='flex justify-end p-3 border-b gap-3'>
				<Button
					size='sm'
					type='button'
					variant='ghost'
					className='flex justify-center items-center gap-2'
				>
					<InputField
						register={{ ...register('published') }}
						type='checkbox'
						value={mode === 'add' ? true : blog.published}
						id='published'
						error={errors.published}
					/>
					<label htmlFor='published'>Publish Blog</label>
				</Button>
				<Button
					disabled={isSubmitting}
					className='flex gap-1 justify-center items-center bg-green-300 hover:bg-green-400'
					size='sm'
					variant='ghost'
					type='submit'
				>
					<img className='w-5 h-5' src='/check.svg' alt='' />
					<p>Save changes</p>
				</Button>
			</section>

			<section className='flex flex-wrap gap-5 justify-center p-3 border-b'>
				{/* blog image aside */}
				<aside className='flex flex-col gap-2 sm:w-[35%]'>
					{/* Blog image section */}
					<img
						className='rounded-sm max-w-[28rem]'
						src={blog.img.url}
						alt='blog image'
					/>
					<div className='max-w-[28rem]'>
						<InputField
							labelClass='text-center'
							register={{ ...register('blogImage') }}
							error={errors.blogImage}
							onChange={(e) => {
								setBlogImage(e.target.files[0]);
							}}
							accept='image/*'
							type='file'
							id='blogImage'
							label=''
						/>
					</div>
					{errors.blogImage && (
						<p className='text-red-500 text-sm text-center'>
							{errors.blogImage.message}
						</p>
					)}
				</aside>

				{/* blog contents aside */}
				<aside className='flex-1'>
					{/* textarea for title */}
					<div className='w-full flex flex-col justify-center'>
						<label htmlFor='title' className='text-center font-meduim text-2xl'>
							Title:
						</label>
						{errors.title && (
							<p className='text-red-500 text-sm text-center'>
								{errors.title.message}
							</p>
						)}
						<textarea
							{...register('title')}
							defaultValue={blog.title}
							className='w-full font-semibold text-2xl text-center border p-2 rounded-md'
							rows={3}
							id='title'
						/>
					</div>

					{/* select field for topic */}
					<div className='py-3 my-2 flex justify-center rounded-md'>
						{errors.topicId && (
							<p className='text-red-500 text-sm text-center'>
								{errors.topicId.message}
							</p>
						)}
						<div className='text-xl'>
							<label htmlFor='topicId'>Topic: </label>
							<select
								{...register('topicId')}
								defaultValue={blog.topic._id}
								className='border rounded-sm p-1'
								id='topicId'
							>
								{topics.map((topic) => (
									<option key={topic._id} value={topic._id}>
										{topic.title}
									</option>
								))}
							</select>
						</div>
					</div>
				</aside>
			</section>

			{/* blogs content editor */}
			<section>
				<h4 className='text-xl text-center pb-3'>Edit blog content here:</h4>

				{errors.text && (
					<p className='text-red-500 text-sm'>{errors.text.message}</p>
				)}
				<Editor
					apiKey={import.meta.env.VITE_TINY_MCE_KEY}
					onInit={(evt, editor) => (textEditorRef.current = editor)}
					initialValue={blog.text}
					init={editorSettings}
				/>
				{errors.root && (
					<p className='text-red-500 text-sm'>{errors.root.message}</p>
				)}
			</section>
		</form>
	);
}
