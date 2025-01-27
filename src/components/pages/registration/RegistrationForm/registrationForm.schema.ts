import { z } from 'zod';

export const registrationSchema = z
    .object({
        firstName: z
            .string()
            .min(1, 'First Name is required')
            .max(11, 'First Name must be at most 11 characters')
            .regex(/^[A-Za-zА-Яа-яЁёЎўІі]+$/, 'First Name must contain only letters'),
        lastName: z
            .string()
            .min(1, 'Last Name is required')
            .max(15, 'Last Name must be at most 15 characters')
            .regex(/^[A-Za-zА-Яа-яЁёЎўІі]+$/, 'Last Name must contain only letters'),
        email: z.string().min(1, 'Email is required').email('Invalid email format'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                'Password must contain at least one letter and one digit',
            ),
        confirmPassword: z.string().min(1, 'Confirm Password is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export type FormData = z.infer<typeof registrationSchema>;
