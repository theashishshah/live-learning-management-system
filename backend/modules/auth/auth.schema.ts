import { z } from "zod";

export const createLoginSchema = z
  .object({
    email: z
      .email({ message: "Please provide valid email address." })
      .transform((e) => e.toLowerCase()),

    password: z.string().min(1, "Password is required"),
  })
  .strict();

export type CreateLoginInput = z.infer<typeof createLoginSchema>;
