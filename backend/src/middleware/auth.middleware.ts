import type { Request, Response, NextFunction } from "express";
import { AppError } from "../core/errors/AppError.js";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new AppError("UNAUTHORIZED", 401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) throw new AppError("UNAUTHORIZED", 401);

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & {
      role: string;
    };

    if (!payload.sub) throw new AppError("UNAUTHORIZED", 401);

    //TODO: test it
    req.user = {
      userId: payload.sub as string,
      role: payload.role,
    };
    next();
  } catch (err) {
    next(new AppError("UNAUTHORIZED", 401));
  }
};
