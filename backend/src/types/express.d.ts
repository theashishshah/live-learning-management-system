import { Meta } from "../core/api-response/response.types.ts";
import type { Role } from "../../modules/auth/auth.service.ts";
import "express";
import type { ClassStatusTypes } from "../../modules/classes/class.types.ts";

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
                id: string;
                teacherId: string;
                status: ClassStatusTypes;
            };
        }
    }
}

export {};
