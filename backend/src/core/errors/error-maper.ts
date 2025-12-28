import { AppError } from "./AppError.js";

export const mapError = (err: unknown) => {
    if (err instanceof AppError) {
        return {
            status: err.status,
            code: err.code,
            message: err.message,
            details: err.details,
        };
    }

    if (err instanceof Error && err.name === "JsonWebTokenError") {
        return {
            status: 401,
            code: "UNAUTHORIZED",
            message: "Invalid token",
        };
    }

    if ((err as any)?.code === 11000) {
        return {
            status: 409,
            code: "CONFLICT",
            message: "Resource already exist.",
            details: (err as any).keyValue,
        };
    }

    return {
        status: 500,
        code: "INTERNAL_ERROR",
        message: "Something went wrong in server. Hang tight",
    };
};
