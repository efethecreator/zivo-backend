import express from "express";
import { getBusinessDashboardController } from "../controllers/dashboard.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.get(
  "/summary/:businessId",
  authenticateToken,
  checkRole("store_owner", "admin"),
  getBusinessDashboardController
);

export default router;
