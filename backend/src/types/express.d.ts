import { Meta } from "../core/api-response/response.types.ts";
import type { Role } from "../../modules/auth/auth.service.ts";
import "express";
import type { Types } from "mongoose";

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
      class?: {
        _id: Types.ObjectId;
        className: string;
        teacherId: Types.ObjectId;
        studentIds: Types.ObjectId[];
      };
    }
  }
}

export {};
