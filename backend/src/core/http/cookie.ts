import type { Response } from "express";

const ACCESS_TOKEN_EXPIRES_IN = 15;
const REFRESH_TOKEN_EXPIRES_IN = 30;

export const clearAuthCookie = (res: Response) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token", {
    path: "/api/v1/auth/refresh",
  });
};

export const setAccessTokenToCookie = (res: Response, accessToken: string) => {
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: ACCESS_TOKEN_EXPIRES_IN * 1000 * 60,
  });
};

export const setRefreshTokenToCookie = (
  res: Response,
  refreshToken: string,
): void => {
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: REFRESH_TOKEN_EXPIRES_IN * 1000 * 60 * 60 * 24,
    path: "/api/v1/auth/refresh",
  });
};
