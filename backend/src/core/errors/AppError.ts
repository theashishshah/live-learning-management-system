export type ErrorCode =
    | "UNAUTHORIZED"
    | "FORBIDDEN"
    | "NOT_FOUND"
    | "VALIDATION_ERROR"
    | "INVALID_CREDENTIALS"
    | "CONFLICT"
    | "INTERNAL_ERROR"
    | "BAD_REQUEST";

export class AppError extends Error {
    public readonly code: ErrorCode;
    public readonly status: number;
    public readonly details?: unknown;
    public readonly isOperational: boolean;

    constructor(code: ErrorCode, status: number, message?: string, details?: unknown) {
        super(message || code);
        this.code = code;
        this.status = status;
        this.isOperational = true;
        if (details) this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}
