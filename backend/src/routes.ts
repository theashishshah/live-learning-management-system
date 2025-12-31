import { Router, type Response } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/user/user.routes.js";
import classRoutes from "../modules/classes/class.routes.js";
import { success } from "./core/api-response/response.helper.js";

const router = Router();

router.get("/helth", (_, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Server health is good.",
  });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/classes", classRoutes);

export default router;
