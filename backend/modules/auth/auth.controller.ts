import type { Request, Response } from "express";
import { login, signup } from "./auth.service.js";
import { success } from "../../src/core/api-response/response.helper.js";

export const signupHandler = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  const user = await signup(email, password, role);
  success(res, user, 201);
};

export const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await login(email, password);
  success(res, { token });
};
