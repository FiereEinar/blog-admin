export function MainContainer({ children }) {
	return (
		<main className='p-5 flex flex-col items-center min-h-screen'>
			{children}
		</main>
	);
}
