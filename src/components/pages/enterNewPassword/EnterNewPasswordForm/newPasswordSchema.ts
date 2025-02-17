import { z } from 'zod';

export const newPasswordSchema = z.object({
    newPassword: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            'Password must contain at least one letter and one digit',
        ),
});
export type NewPasswordParams = z.infer<typeof newPasswordSchema>;
