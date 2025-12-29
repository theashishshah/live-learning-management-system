import { Meta } from "../core/api-response/response.types.ts";
import "express";

declare global {
  namespace express {
    interface Locals {
      meta: Meta;
    }
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
    }
  }
}

export {};
