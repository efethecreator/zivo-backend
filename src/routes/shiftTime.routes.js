import express from "express";
import {
  createShiftTimeController,
  getShiftTimesController,
  updateShiftTimeController,
  deleteShiftTimeController,
} from "../controllers/shiftTime.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  checkRole("admin", "store_owner"),
  createShiftTimeController
);

router.get("/", getShiftTimesController);

router.put(
  "/:id",
  authenticateToken,
  checkRole("admin", "store_owner"),
  updateShiftTimeController
);

router.delete(
  "/:id",
  authenticateToken,
  checkRole("admin", "store_owner"),
  deleteShiftTimeController
);

export default router;
