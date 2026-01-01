import { z } from "zod";

export const createClassSchema = z.object({
  className: z.string().trim().min(1, "Class name is required").max(100),
});

export type CreateClassInput = z.infer<typeof createClassSchema>;

export const addStudentSchema = z.object({
  studentId: z.string(),
});

export type AddStudentInput = z.infer<typeof addStudentSchema>;
