import express from "express";
import {
  loginHandler,
  signupHandler,
} from "../modules/auth/auth.controller.js";
import { authenticate } from "./middleware/auth.middleware.js";

const routes = express.Router();
routes.get("/login", loginHandler);
routes.post("/signup", signupHandler);

export default routes;
