import bcrypt from "bcrypt";
import crypto from "crypto";
import { User } from "../user/user.model.js";
import { AppError } from "../../src/core/errors/AppError.js";
import { signAccessToken, signRefreshToken } from "./auth.jwt.js";
import type { CreateUserInput } from "../user/user.schema.js";
import type { CreateLoginInput } from "./auth.schema.js";
import { Session } from "./session.model.js";

//TODO: implement access and refresh token as well

export type AuthApiResponse = {
  user: {
    id: string;
    email: string;
    role: Role;
  };
  accessToken: string;
  refreshToken: string;
};

export type Role = "student" | "teacher";

export const signup = async (
  input: CreateUserInput,
): Promise<AuthApiResponse> => {
  const {
    email,
    password,
    role,
    userAgent = "chrome default",
    ip = "198.168.92.1 default",
  } = input;

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const user = await User.create({
      email,
      passwordHash,
      role,
    });

    const refreshToken = signRefreshToken({ userId: user._id.toString() });

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    await Session.create({
      userId: user._id,
      refreshTokenHash,
      userAgent,
      ip,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });

    const accessToken = signAccessToken({
      userId: user._id.toString(),
      role: user.role,
    });

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw error;
  }
};

export const login = async (
  input: CreateLoginInput,
): Promise<AuthApiResponse> => {
  const {
    email,
    password,
    userAgent = "chrome deafult",
    ip = "192.168.1.2 default",
  } = input;

  try {
    const user = await User.findOne({ email }).select("+passwordHash");

    if (!user)
      throw new AppError(
        "INVALID_CREDENTIALS",
        400,
        "Email or password is incorrect",
      );

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      throw new AppError(
        "INVALID_CREDENTIALS",
        400,
        "Email or password is incorrect",
      );

    const refreshToken = signRefreshToken({
      userId: user._id.toString(),
    });

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    await Session.create({
      userId: user._id,
      refreshTokenHash,
      userAgent,
      ip,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    });

    const accessToken = signAccessToken({
      userId: user._id.toString(),
      role: user.role,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const me = async ({ userId }: { userId: string }) => {
  try {
    const _id = new Object(userId);
    const user = await User.findById({ _id }).select("email role createdAt");
    if (!user) {
      throw new AppError("NOT_FOUND", 404, "User not found");
    }

    return {
      sucess: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  } catch (error) {
    throw error;
  }
};
