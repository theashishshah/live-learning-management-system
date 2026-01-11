import { z } from "zod";

export const createLoginSchema = z
    .object({
        email: z
            .email({ message: "Please provide valid email address." })
            .max(254, "Email is too long.")
            .transform((e) => e.toLowerCase()),

        password: z.string().min(1, "Password is required").max(128, "Password is too long"),
        userAgent: z.string().trim().optional(),
        ip: z.string().trim().optional(),
    })
    .strict();

export type CreateLoginInput = z.infer<typeof createLoginSchema>;
