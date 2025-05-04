import express from "express";
import {
  createWorkerController,
  getWorkersController,
  getWorkerByIdController,
  updateWorkerController,
  deleteWorkerController,
} from "../controllers/businessWorker.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  checkRole("store_owner", "admin"),
  createWorkerController
);

router.get(
  "/business/:businessId",
  authenticateToken,
  checkRole("customer", "store_owner", "admin"),
  getWorkersController
);

router.get(
  "/:id",
  authenticateToken,
  checkRole("customer", "store_owner", "admin"),
  getWorkerByIdController
);

router.put(
  "/:id",
  authenticateToken,
  checkRole("store_owner", "admin"),
  updateWorkerController
);

router.delete(
  "/:id",
  authenticateToken,
  checkRole("store_owner", "admin"),
  deleteWorkerController
);

export default router;
