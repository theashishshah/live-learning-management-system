import type { NextFunction, Request, Response } from "express";
import { AppError } from "../core/errors/AppError.js";
import { Class } from "../../modules/classes/class.model.js";
import { assertClassOwnership } from "../../modules/classes/class.ownership.js";

/**
 *
 * @param req user and classId
 * @param _res NA
 * @param next NA
 */

export async function requireClassOwnership(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      throw new AppError("UNAUTHORIZED", 401, "You don't have permission");
    }

    const classId = req.params.classId;
    if (!classId) {
      throw new AppError("BAD_REQUEST", 400, "Client side error");
    }

    const classEntity = await Class.findById({ classId });
    if (!classEntity) {
      throw new AppError("NOT_FOUND", 404, "Class doesn't exist");
    }

    assertClassOwnership(classEntity, req.user.userId);

    req.class = classEntity;

    next();
  } catch (error) {
    next(error);
  }
}
