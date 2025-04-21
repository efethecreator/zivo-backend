import express from "express";
import {
  createBusinessWorkerController,
  getBusinessWorkersController,
  updateWorkerTypeController,
  deleteBusinessWorkerController,
} from "../controllers/businessWorker.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  checkRole("store_owner", "admin"),
  createBusinessWorkerController
);

router.get("/:businessId", getBusinessWorkersController);

router.put(
  "/:id",
  authenticateToken,
  checkRole("store_owner", "admin"),
  updateWorkerTypeController
);

router.delete(
  "/:id",
  authenticateToken,
  checkRole("store_owner", "admin"),
  deleteBusinessWorkerController
);

export default router;
