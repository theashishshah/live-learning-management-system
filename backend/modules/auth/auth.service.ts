import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../user/user.model.js";
import { AppError } from "../../src/core/errors/AppError.js";
import { mapError } from "../../src/core/errors/error-maper.js";

type Role = "student" | "teacher";

export const signup = async (email: string, password: string, role: Role) => {
    if (!password?.trim() || !email?.trim())
        throw new AppError("VALIDATION_ERROR", 400, "Email or password is missing.");

    if (password.trim().length < 8)
        throw new AppError("VALIDATION_ERROR", 400, "Password too short.");

    const normalizeEmail = email.trim().toLowerCase();

    const passwordHash = await bcrypt.hash(password, 12);

    try {
        const user = await User.create({
            email: normalizeEmail,
            passwordHash,
            role: role.trim(),
        });

        return {
            id: user._id,
            email: user.email,
            role: user.role,
        };
    } catch (error) {
        mapError(error);
    }
};

export const login = async (email: string, password: string) => {
    if (!password?.trim() || !email?.trim())
        throw new AppError("VALIDATION_ERROR", 400, "Email or password is missing.");
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail }).select("+passwordHash");

    if (!user) throw new AppError("INVALID_CREDENTIALS", 400, "Email or password is incorrect");

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new AppError("INVALID_CREDENTIALS", 400, "Email or password is incorrect");

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
    }

    const token = jwt.sign(
        {
            sub: user._id.toString(),
            role: user.role,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "1d",
        }
    );

    return {
        token,
        user: {
            userId: user._id,
            email: user.email,
            role: user.role,
        },
    };
};
