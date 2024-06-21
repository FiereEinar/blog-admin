import { fetchBlogs, updateBlog } from '@/api/blog';
import { fetchTopics } from '@/api/topic';
import { DefaultLoadingScreen } from '@/components/LoadingScreens';
import { Button } from '@/components/ui/button';
import { MainContainer } from '@/components/ui/container';
import { InputField } from '@/components/ui/inputField';
import { useToast } from '@/components/ui/use-toast';
import { editorSettings } from '@/constants';
import useLoadingTracker from '@/hooks/useLoadingTracker';
import { blogSchema } from '@/utils/validations/blogSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export default function BlogEditPage() {
	const { toast } = useToast();
	const navigate = useNavigate();
	const { blogId } = useParams();
	const [blogImage, setBlogImage] = useState(null);
	const textEditorRef = useRef(null);
	let blog = null;

	const {
		data: blogs,
		error: blogsError,
		isLoading: blogsLoading,
	} = useQuery({
		queryKey: ['blogs'],
		queryFn: fetchBlogs,
	});

	const {
		data: topics,
		error: topicsError,
		isLoading: topicsLoading,
		refetch,
	} = useQuery({
		queryKey: ['topics'],
		queryFn: fetchTopics,
	});

	useLoadingTracker(blogsLoading, 3, () => {
		toast({
			title: 'Hang in there.',
			description:
				'The server is still waking up from its sleep, this would only take up to 20-30 seconds :)',
		});
	});

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
			const formData = new FormData();

			formData.append('text', textEditorRef.current.getContent());
			formData.append('title', data.title);
			formData.append('topicId', data.topicId);
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

	if (blogs) blog = blogs.find((x) => x._id === blogId);

	if (blogsLoading || topicsLoading) {
		return <DefaultLoadingScreen />;
	}

	if (blogsError || topicsError) {
		return <h1>An error has occurred, please restart the application</h1>;
	}

	return (
		<MainContainer>
			<h1 className='text-2xl pb-5'>Edit Blog</h1>

			<form onSubmit={handleSubmit(onFormSubmit)} className=''>
				<section className='flex flex-wrap gap-5 justify-center border rounded-md shadow-lg p-5'>
					{/* blog image aside */}
					<aside className='flex flex-col gap-2 lg:w-[35%]'>
						{/* form submit button */}
						<div className='w-fit'>
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
						</div>

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
					</aside>

					{/* blog contents aside */}
					<aside className='flex-1'>
						{/* textarea for title */}
						<div className='w-full flex flex-col justify-center mt-3'>
							<label
								htmlFor='title'
								className='text-center font-meduim text-2xl'
							>
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

						{/* blogs content editor */}
						<div>
							<h4 className='text-xl text-center my-3'>
								Edit blog content here:
							</h4>

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
						</div>
					</aside>
				</section>
			</form>
		</MainContainer>
	);
}
