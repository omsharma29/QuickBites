import { z } from 'zod';

export const UserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export type UserType = z.infer<typeof UserSchema>;
