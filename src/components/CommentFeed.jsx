import { format } from 'date-fns';
import { Comment } from './Comment';
import { capitalizeFirstLetter } from '@/lib/utils';

export default function CommentFeed({ comments, refetch }) {
	return (
		<div className='flex flex-col gap-2'>
			{comments.length === 0 && (
				<p className='italic text-sm text-muted-foreground'>No comments yet.</p>
			)}
			{comments.map((comment) => (
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
