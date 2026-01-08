import type { NextFunction, Request, Response } from "express";
import type { PolicyFnTypes } from "../core/policy/policy.types.js";
import { AppError } from "../core/errors/AppError.js";

export const authorizePolicy = function <U, R>(
    policy: PolicyFnTypes<U, R>,
    getResource: (req: Request) => R
) {
    return function (req: Request, _res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                throw new AppError("UNAUTHORIZED", 401, "Authentication required");
            }

            const resource = getResource(req);
            if (!resource) {
                throw new AppError(
                    "INTERNAL_ERROR",
                    500,
                    "Internal server error, please try again"
                );
            }

            const isAllowed = policy(req.user as U, resource);
            if (!isAllowed) {
                throw new AppError("FORBIDDEN", 403, "You don't have permission");
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};
