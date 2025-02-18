import { z } from 'zod';

const phoneSchema = z
    .string()
    .trim()
    .refine((val) => {
        const cleaned = val.replace(/\D/g, '');
        return /^375(25|29|33|44|17)\d{7}$/.test(cleaned);
    }, 'Invalid format');

export const personalProfileFormSchema = z.object({
    position: z.string().optional(),
    startDay: z.string().optional(),
    endDate: z.string().optional(),
    dateOfBirth: z.string().optional(),
    phoneNumber: phoneSchema.optional(),
    contactUsername: z.string().optional(),
});
