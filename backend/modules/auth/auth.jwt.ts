import jwt from "jsonwebtoken";

export const signAccessToken = (payload: {
  userId: string;
  role: string;
}): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  return token;
};
