import type { Response, Request, NextFunction } from "express";
import { mapError } from "../core/errors/error-maper.js";
import { failure } from "../core/api-response/response.helper.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const mapped = mapError(err);

  console.log("error handler middleware running...", err);
  if (mapped.status === 500) console.error(err);

  return failure(
    res,
    mapped.code,
    mapped.status,
    mapped.message,
    mapped?.details,
  );
};
