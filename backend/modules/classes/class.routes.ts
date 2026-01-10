import { Router } from "express";
import { authenticate } from "../../src/middleware/authenticate.middleware.js";
import {
  createClassHandler,
  deleteClassHandler,
  getClassHandler,
  joinClassHandler,
  leaveClassHandler,
  publishClassHandler,
  startClassHandler,
  updateClassHandler,
} from "./class.controller.js";
import { endClassHandler } from "./class.service.js";
import { authorizePolicy } from "../../src/middleware/authorizePolicy.js";
import { ClassPolicy } from "./class.policy.js";
import { loadClass } from "../../src/middleware/loadClass.middleware.js";

const classRoutes = Router();

classRoutes.post(
  "/",
  authenticate,
  authorizePolicy(ClassPolicy.canCreate, (req) => req.class),
  createClassHandler,
);

classRoutes.patch(
  "/:id",
  authenticate,
  loadClass,
  authorizePolicy(ClassPolicy.canUpdate, (req) => req.class!),
  updateClassHandler,
);

classRoutes.delete(
  "/:id",
  authenticate,
  authorizePolicy(ClassPolicy.canDelete, (req) => req.class!),
  deleteClassHandler,
);

classRoutes.post(
  "/:id/publish",
  authenticate,
  authorizePolicy(ClassPolicy.canPublish, (req) => req.class!),
  publishClassHandler,
);

classRoutes.post(
  "/:id/start",
  authenticate,
  loadClass,
  authorizePolicy(ClassPolicy.canStart, (req) => req.class!),
  startClassHandler,
);

classRoutes.post(
  "/:id/end",
  authenticate,
  loadClass,
  authorizePolicy(ClassPolicy.canEnd, (req) => req.class!),
  endClassHandler,
);

classRoutes.get(
  "/:id",
  authenticate,
  loadClass,
  authorizePolicy(ClassPolicy.canView, (req) => req.class!),
  getClassHandler,
);

classRoutes.post(
  "/:id/join",
  authenticate,
  loadClass,
  authorizePolicy(ClassPolicy.canJoin, (req) => req.class!),
  joinClassHandler,
);

classRoutes.post(
  "/:id/leave",
  authenticate,
  loadClass,
  authorizePolicy(ClassPolicy.canLeave, (req) => req.class!),
  leaveClassHandler,
);

export default classRoutes;
