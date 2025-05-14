import express from "express";
import {
  createWorkerTypeController,
  getAllWorkerTypesController,
  getWorkerTypeByIdController,
  updateWorkerTypeController,
  deleteWorkerTypeController,
} from "../controllers/workerType.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", getAllWorkerTypesController);
router.get("/:id", getWorkerTypeByIdController);

router.post(
  "/",
  authenticateToken,
  checkRole("admin"),
  createWorkerTypeController
);

router.put(
  "/:id",
  authenticateToken,
  checkRole("admin"),
  updateWorkerTypeController
);

router.delete(
  "/:id",
  authenticateToken,
  checkRole("admin"),
  deleteWorkerTypeController
);

export default router;
