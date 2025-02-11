import { z } from "zod";

export const LoginSchema = z.object({
    username: z.string().min(3, { message: "Invalid username." }), // Username is required and must be valid
    password: z.string().min(6, { message: "Password must be at least 6 characters." }), // Password is required and must have a minimum length of 6 characters
});

export type TLoginFormValues = z.infer<typeof LoginSchema>;
