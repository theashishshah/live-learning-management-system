import { z } from "zod";

export const createUserSchema = z
    .object({
        email: z
            .email({ message: "Please provide valid email address." })
            .transform((value) => value.toLowerCase()),

        password: z
            .string()
            .min(8, "password length must be at least 8 characters")
            .max(72, "why are you keeping your password this big?"),

        role: z.enum(["student", "teacher"]).default("student"),
        userAgent: z.string().trim().optional(),
        ip: z.string().trim().optional(),
    })
    .strict();

export type CreateUserInput = z.infer<typeof createUserSchema>;
