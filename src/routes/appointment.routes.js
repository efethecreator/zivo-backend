import express from "express";
import {
  createAppointmentController,
  getMyAppointmentsController,
  getAppointmentByIdController,
  deleteAppointmentController,
  getAppointmentsByBusinessIdController,
  updateAppointmentStatusController,
  assignWorkerToAppointmentController,
  getRecentAppointmentsController,
  rescheduleAppointmentController
} from "../controllers/appointment.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  checkRole("customer"),
  createAppointmentController
);

router.get(
  "/my",
  authenticateToken,
  checkRole("customer", "store_owner", "admin"),
  getMyAppointmentsController
);

router.get(
  "/:id",
  authenticateToken,
  checkRole("customer"),
  getAppointmentByIdController
);

router.delete(
  "/:id",
  authenticateToken,
  checkRole("customer"),
  deleteAppointmentController
);

router.get(
  "/business/:businessId",
  authenticateToken,
  checkRole("store_owner", "admin"),
  getAppointmentsByBusinessIdController
);

router.put(
  "/:id/status",
  authenticateToken,
  checkRole("store_owner", "admin"),
  updateAppointmentStatusController
);

router.put(
  "/:id/assign",
  authenticateToken,
  checkRole("store_owner", "admin"),
  assignWorkerToAppointmentController
);

router.get(
  "/business/:businessId/recent",
  getRecentAppointmentsController
);

router.put(
  "/:id/reschedule",
  authenticateToken,
  checkRole("customer"),
  rescheduleAppointmentController
);

export default router;
