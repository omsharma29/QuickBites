import {z} from "zod"

export const UserSchema = z.object({
    email: z.string().email("Invalid email format"),
    password : z.string().min(6, "Password Must be min 6 character")
})

export type LoginSchema = z.infer<typeof UserSchema>