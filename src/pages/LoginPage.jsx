import { Logo } from '@/components/ui/logo';
import LogInForm from '@/components/forms/LogInForm';

export default function LoginPage() {
	return (
		<main>
			<nav className='p-3 border-b md:px-10'>
				<Logo />
			</nav>

			<section className='flex flex-col items-center justify-center pt-10 gap-5'>
				<h1 className='text-3xl'>Login</h1>
				<LogInForm />
			</section>
		</main>
	);
}
