import type { Request, Response, NextFunction } from "express";
import { login, signup } from "./auth.service.js";
import { success } from "../../src/core/api-response/response.helper.js";
import { setAuthCookie } from "../../src/core/http/cookie.js";

export const signupHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, role, password } = req.body;
    const { user, accessToken } = await signup(email, password, role);
    setAuthCookie(res, accessToken);

    success(res, { user }, 201);
  } catch (error) {
    next(error);
  }
};

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken } = await login(email, password);
    setAuthCookie(res, accessToken);
    success(res, { user }, 200);
  } catch (err) {
    next(err);
  }
};
