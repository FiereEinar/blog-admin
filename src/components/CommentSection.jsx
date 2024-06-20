import CommentForm from './forms/CommentForm';
import CommentFeed from './CommentFeed';

export default function CommentSection({ comments, refetch }) {
	return (
		<aside className='flex flex-col gap-3 mt-10 p-5 border-x max-w-[26rem] w-full'>
			<h1 className='text-xl mb-3'>Comments</h1>

			<div className='min-h-[30rem] flex flex-col justify-between'>
				<CommentFeed comments={comments} refetch={refetch} />
				<CommentForm refetch={refetch} />
			</div>
		</aside>
	);
}
