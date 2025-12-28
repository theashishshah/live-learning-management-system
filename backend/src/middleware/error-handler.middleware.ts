import type { Response, Request, NextFunction } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("error handler middleware runnin...", err);

    res.status(500).json({
        success: false,
        error: {
            code: "INTERNAL_ERROR",
            message: "Something went wrong.",
        },
        meta: res.locals?.meta,
    });
};
