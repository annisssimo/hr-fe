import { z } from 'zod';

export const registrationSchema = z
    .object({
        firstName: z
            .string()
            .min(1)
            .max(11)
            .regex(
                new RegExp("^[a-zA-Z']+$"),
                'First name must contain only letters or apostrophes and have length between 1 and 11',
            ),
        lastName: z
            .string()
            .min(2)
            .max(15)
            .regex(
                new RegExp("^[a-zA-Z']+$"),
                'Last name must contain only letters or apostrophes and have length between 2 and 15',
            ),
        email: z.string().min(1, 'Email is required').email('Invalid email format'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .max(20)
            .regex(
                new RegExp('^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d]{8,20}$'),
                'Password must be between 8 and 20 characters long and contain one letter and one digit',
            ),
        confirmPassword: z.string().min(1, 'Confirm Password is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export type FormData = z.infer<typeof registrationSchema>;
