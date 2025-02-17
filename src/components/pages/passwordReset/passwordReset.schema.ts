import { z } from 'zod';

export const passwordResetSchema = z.object({
    email: z
        .string({
            required_error: 'Email is required',
        })
        .email('Invalid email format'),
});

export type PasswordResetParams = z.infer<typeof passwordResetSchema>;
