import { z } from "zod";

export const createClassSchema = z.object({
  className: z.string().trim().min(1, "Class name is required").max(100),
});

export const addStudentSchema = z.object({
  studentId: z.string(),
});
