import type { Request, Response, NextFunction } from "express";
import { failure } from "../core/api-response/response.helper.js";

export const requireTeacher = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user && req.user.role !== "teacher")
    return failure(res, "FORBIDDEN", 401, "Forbidden, teacher access required");

  next();
};

export const requireStudent = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user && req.user.role !== "student")
    return failure(res, "FORBIDDEN", 401, "Forbidden, student access required");

  next();
};
