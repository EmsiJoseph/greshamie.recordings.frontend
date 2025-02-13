import { z } from "zod";

export const LoginSchema = z.object({
    username: z.string().min(3, { message: "Invalid username." }), 
    password: z.string().min(6, { message: "Incorrect password." }), 
});

export type TLoginFormValues = z.infer<typeof LoginSchema>;
