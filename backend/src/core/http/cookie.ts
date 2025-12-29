import type { Response } from "express";

const tokenExpiryMinutes = 15;

export const setAuthCookie = (res: Response, accessToken: string) => {
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: tokenExpiryMinutes * 60 * 1000,
  });
};

export const clearAuthCookie = (res: Response) => {
  res.clearCookie("access_token");
};
