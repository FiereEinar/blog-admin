import { format } from 'date-fns';
import { Comment } from './Comment';
import { capitalizeFirstLetter } from '@/lib/utils';

export default function CommentFeed({ comments, refetch }) {
	const commentList = comments.filter((comment) => comment.hidden === false);

	return (
		<div className='flex flex-col gap-2'>
			{commentList.length === 0 && (
				<p className='italic text-sm text-muted-foreground'>No comments yet.</p>
			)}
			{commentList.map((comment) => (
				<Comment
					refetch={refetch}
					commentId={comment._id}
					commenterId={comment.creator?._id}
					imgURL={comment.creator?.profile?.imgUrl || undefined}
					key={comment._id}
					text={comment.text}
					date={format(comment.dateAdded, 'MMMM dd, yyyy')}
					author={`${capitalizeFirstLetter(comment.creator.firstName)} 
								${capitalizeFirstLetter(comment.creator.lastName)}`}
				/>
			))}
		</div>
	);
}
