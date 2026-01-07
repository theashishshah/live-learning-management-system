import { Router } from "express";
import { authenticate } from "../../src/middleware/authenticate.middleware.js";
import { addStudentHandler, createClassHandler } from "./class.controller.js";
import { requireTeacher } from "../../src/middleware/rbac.middleware.js";
import { authorize } from "../../src/middleware/autorize.middleware.js";
import { requireClassOwnership } from "../../src/middleware/requireClassOwnership.middleware.js";
import { endClassHandler } from "./class.service.js";
import { assertClassOwnership } from "./class.ownership.js";

const classRoutes = Router();

classRoutes.post("/", authenticate, authorize("teacher"), createClassHandler);
classRoutes.post(
  "/:classId/attendance",
  authenticate,
  authorize("teacher"),
  requireClassOwnership,
  addStudentHandler,
);

classRoutes.patch(
  "/:classId",
  authenticate,
  authorize("teacher"),
  requireClassOwnership,
  endClassHandler,
);

export default classRoutes;
