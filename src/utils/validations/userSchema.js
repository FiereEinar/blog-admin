import { z } from 'zod';

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password must not be empty'),
});

export const userCommentSchema = z.object({
  text: z.string().min(3, 'Comment must be atleast 3 characters.'),
});

export const userSignInSchema = z.object({
  firstName: z.string().min(1, 'First name must not be empty'),
  lastName: z.string().min(1, 'Last name must not be empty'),
  email: z.string().email(),
  password: z.string().min(1, 'Password  must not be empty'),
  confirmPassword: z.string().min(1, 'Confirm password must not be empty'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords must match.',
  path: ['confirmPassword']
});

export const userUpdateSchema = z.object({
  firstName: z.string().min(1, 'First name must not be empty'),
  lastName: z.string().min(1, 'Last name must not be empty'),
  email: z.string().email(),
});
