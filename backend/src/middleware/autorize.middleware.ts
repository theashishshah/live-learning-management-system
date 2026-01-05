import type { Request, Response, NextFunction } from "express";
import type { Role } from "../../modules/auth/auth.service.js";
import { AppError } from "../core/errors/AppError.js";

export const authorize =
  (...allowedRoles: readonly Role[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new AppError("UNAUTHORIZED", 401);
      }

      const { role } = req.user;

      if (!allowedRoles.includes(role)) {
        throw new AppError("FORBIDDEN", 403);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
