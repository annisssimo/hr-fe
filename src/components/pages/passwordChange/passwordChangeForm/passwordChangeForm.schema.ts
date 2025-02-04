import { z } from 'zod';

export const changePasswordSchema = z
    .object({
        oldPassword: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                'Password must contain at least one letter and one digit',
            ),
        newPassword: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                'Password must contain at least one letter and one digit',
            ),
    })
    .refine((data) => data.oldPassword != data.newPassword, {
        message: 'Passwords should not match',
        path: ['newPassword'],
    });

export type FormData = z.infer<typeof changePasswordSchema>;
