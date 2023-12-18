import { TypeOf, z } from 'zod';

export const CreateUserDto = z.object({
  body: z
    .object({
      firstName: z
        .string({ required_error: 'First name is required', invalid_type_error: 'First name must be a string' })
        .trim()
        .min(2, 'First name must be longer than 2 characters')
        .max(20, 'First name cannot exceed 20 characters'),
      lastName: z
        .string({ required_error: 'Last name is required', invalid_type_error: 'Last name must be a string' })
        .trim()
        .min(2, 'Last name is must be longer than 2 characters')
        .max(25, 'Last name cannot exceed 25 characters'),
      email: z
        .string({ required_error: 'Email is required', invalid_type_error: 'Email must be a string' })
        .email('Invalid email address')
        .max(50, 'Email cannot exceed 50 characters'),
      username: z
        .string({ required_error: 'Username is required', invalid_type_error: 'Username must be a string' })
        .trim()
        .min(4, 'Username must be longer than 4 characters')
        .max(25, 'Username cannot exceed 25 characters'),
      password: z
        .string({ required_error: 'Password is required', invalid_type_error: 'Password must be a string' })
        .trim()
        .min(6, 'Password must be longer than 6 characters')
        .max(30, 'Password cannot exceed 30 characters'),
      confirmPassword: z.string({ required_error: 'Confirm password is required', invalid_type_error: 'Confirm password must be a string' }).trim(),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'Passwords do not match',
          path: ['confirmPassword'],
        });
      }
    }),
});

export type CreateUserDtoT = TypeOf<typeof CreateUserDto>;
