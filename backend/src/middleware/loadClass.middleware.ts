import type { NextFunction, Request, Response } from "express";
import { Class } from "../../modules/classes/class.model.js";
import { AppError } from "../core/errors/AppError.js";

export const loadClass = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        const classEntity = await Class.findById(req.params.id);
        if (!classEntity) {
            throw new AppError("BAD_REQUEST", 404, "Invalid request ");
        }

        req.class = {
            id: classEntity._id.toString(),
            className: classEntity.className,
            status: classEntity.status,
        };

        next();
    } catch (error) {
        next(error);
    }
};
