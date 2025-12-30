import { Router } from "express";
import { meHandler, signupHandler, loginHandler } from "./auth.controller.js";
import { authenticate } from "../../src/middleware/auth.middleware.js";

const authRoutes = Router();

authRoutes.get("/me", authenticate, meHandler);
authRoutes.get("/login", loginHandler);
authRoutes.post("/signup", signupHandler);

export default authRoutes;
