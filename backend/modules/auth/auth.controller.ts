import type { Request, Response, NextFunction } from "express";
import { login, signup, me, refreshSession, logout } from "./auth.service.js";
import { sendResponse } from "../../src/core/api-response/api-responder.js";
import {
    setAccessTokenToCookie,
    setRefreshTokenToCookie,
    clearAuthCookie,
} from "../../src/core/http/cookie.js";
import { createUserSchema } from "../user/user.schema.js";
import { createLoginSchema } from "./auth.schema.js";
import { AppError } from "../../src/core/errors/AppError.js";

export const signupHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = createUserSchema.parse({
            ...req.body,
            userAgent: req.headers["user-agent"],
            ip: req.ip,
        });
        const { user, accessToken, refreshToken } = await signup({
            ...data,
            role: "student",
        });
        setAccessTokenToCookie(res, accessToken);
        setRefreshTokenToCookie(res, refreshToken);
        sendResponse(res, { user }, 201);
    } catch (error) {
        next(error);
    }
};

export const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = createLoginSchema.parse({
            ...req.body,
            userAgent: req.headers["user-agent"],
            ip: req.ip,
        });

        const { user, accessToken, refreshToken } = await login(data);
        setAccessTokenToCookie(res, accessToken);
        setRefreshTokenToCookie(res, refreshToken);
        sendResponse(res, { user }, 200);
    } catch (error) {
        next(error);
    }
};

export const meHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) throw new AppError("UNAUTHORIZED", 401);

        const result = await me({ userId: req.user.userId });
        return res.json(result);
    } catch (error) {
        next(error);
    }
};

export const logoutHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies?.refresh_token;
        await logout(refreshToken);
        clearAuthCookie(res);
        sendResponse(
            res,
            {
                message: "user logged out successfully",
            },
            200
        );
    } catch (error) {
        next(error);
    }
};

export const refreshHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies?.refresh_token;
        if (!refreshToken) {
            throw new AppError("UNAUTHORIZED", 401);
        }

        const { accessToken, refreshToken: newRefreshToken } = await refreshSession(refreshToken);

        setAccessTokenToCookie(res, accessToken);
        setRefreshTokenToCookie(res, newRefreshToken);

        return res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};
