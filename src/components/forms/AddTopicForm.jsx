import { useState } from 'react';
import DialogWrapper from '../DialogWrapper';
import { Button } from '../ui/button';
import { InputField } from '../ui/inputField';
import { addTopic, fetchTopics } from '@/api/topic';
import { useToast } from '../ui/use-toast';
import { useQuery } from '@tanstack/react-query';

export default function AddTopicForm() {
	const { toast } = useToast();
	const [topicTitle, setTopicTitle] = useState('');
	const [loading, setLoading] = useState(false);
	const { refetch } = useQuery({
		queryKey: ['topics'],
		queryFn: fetchTopics,
	});

	const addTopicHandler = async () => {
		try {
			setLoading(true);
			if (topicTitle === '') {
				toast({
					variant: 'destructive',
					title: 'Failed to add topic',
					description: 'Topic title should not be empty',
				});
				return;
			}

			const result = await addTopic({ title: topicTitle });

			if (!result.success) {
				toast({
					variant: 'destructive',
					title: 'Failed to add topic',
					description: 'An error occured while adding the topic',
				});
				return;
			}

			setTopicTitle('');
			refetch();
			toast({
				description: 'Topic added successfully!',
			});
		} catch (err) {
			console.log('Error adding topic', err);
			toast({
				variant: 'destructive',
				title: 'Failed to add topic',
				description: 'An error occured while adding the topic',
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<DialogWrapper
			onConfirm={addTopicHandler}
			title='Add Topic'
			customConfirmBtn='Add Topic'
			description='Enter the name for the new topic.'
			trigger={
				<Button
					disabled={loading}
					className='flex gap-1 justify-center items-center'
					size='sm'
					variant='ghost'
				>
					<img className='w-5 h-5' src='/add.svg' alt='' />
					<span>Add Topic</span>
				</Button>
			}
		>
			<div className='w-full'>
				<InputField
					value={topicTitle}
					onChange={(e) => setTopicTitle(e.target.value)}
					type='text'
					id='title'
					label='Topic Title: '
				/>
			</div>
		</DialogWrapper>
	);
}
