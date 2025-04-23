import express from "express";
import {
  createBusinessShiftController,
  getShiftsByBusinessController,
  updateBusinessShiftController,
  deleteBusinessShiftController,
} from "../controllers/businessShift.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  checkRole("store_owner", "admin"),
  createBusinessShiftController
);

router.get(
  "/business/:businessId",
  getShiftsByBusinessController
);

router.put(
  "/:id",
  authenticateToken,
  checkRole("store_owner", "admin"),
  updateBusinessShiftController
);

router.delete(
  "/:id",
  authenticateToken,
  checkRole("store_owner", "admin"),
  deleteBusinessShiftController
);

export default router;
