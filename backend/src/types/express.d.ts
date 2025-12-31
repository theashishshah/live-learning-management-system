import { Meta } from "../core/api-response/response.types.ts";
import type { Role } from "../../modules/auth/auth.service.ts";
import "express";

declare global {
  namespace Express {
    interface Locals {
      meta: Meta;
    }
    interface Request {
      user?: {
        userId: string;
        role: Role;
      };
    }
  }
}

export {};
