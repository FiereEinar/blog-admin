import ProfileForm from './forms/ProfileForm';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	// SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

export default function ProfileSheet() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size='sm' variant='ghost' className='flex gap-1 md:px-8'>
					<img className='w-5 h-5' src='/profile.svg' alt='' />
					<span className='sm:flex hidden'>Profile</span>
				</Button>
			</SheetTrigger>

			<SheetContent>
				<SheetHeader>
					<SheetTitle>Edit profile</SheetTitle>
					<SheetDescription>
						Make changes to your profile here. Click save when you are done.
					</SheetDescription>
				</SheetHeader>

				<ProfileForm />

				<SheetFooter></SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
