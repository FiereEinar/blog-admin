import SignUpForm from '@/components/forms/SignUpForm';
import { Logo } from '@/components/ui/logo';

export default function SignupPage() {
	return (
		<main>
			<nav className='p-3 border-b md:px-10'>
				<Logo />
			</nav>

			<section className='flex flex-col items-center justify-center pt-10 gap-5'>
				<h1 className='text-3xl'>Sign up</h1>
				<SignUpForm />
			</section>
		</main>
	);
}
