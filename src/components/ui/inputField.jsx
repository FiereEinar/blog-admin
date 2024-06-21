export function InputField({
	id,
	label,
	type,
	error,
	register,
	labelClass,
	...rest
}) {
	return (
		<div className='flex-1 flex flex-col '>
			<label className={labelClass} htmlFor={id}>
				{label}
			</label>
			<input
				autoComplete='true'
				{...register}
				{...rest}
				id={id}
				className='border border-slate-400 rounded-sm p-1 px-2'
				type={type}
			/>
			{error && <p className='text-red-500 text-sm'>{error.message}</p>}
		</div>
	);
}
