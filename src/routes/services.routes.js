// File: src/routes/services.routes.js
import express from "express";
import {
  createServiceController,
  getAllServicesController,
  getServiceByIdController,
  updateServiceController,
  deleteServiceController,
  getServiceByBusinessIdController,
  assignWorkersToServiceController,
  getServiceWorkersController,
  removeServiceWorkerController,
  updateServiceWorkersController,
} from "../controllers/services.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  checkRole("store_owner", "admin"),
  createServiceController
);

router.get("/", getAllServicesController);

router.get("/:id", getServiceByIdController);

router.get("/business/:businessId", getServiceByBusinessIdController);

router.put(
  "/:id",
  authenticateToken,
  checkRole("store_owner", "admin"),
  updateServiceController
);

router.delete(
  "/:id",
  authenticateToken,
  checkRole("store_owner", "admin"),
  deleteServiceController
);

router.post(
  "/:id/workers",
  authenticateToken,
  checkRole("store_owner", "admin"),
  assignWorkersToServiceController
);

router.get(
  "/:id/workers",
  authenticateToken,
  checkRole("customer", "store_owner", "admin"),
  getServiceWorkersController
);

router.delete(
  "/:id/workers/:workerId",
  authenticateToken,
  checkRole("store_owner", "admin"),
  removeServiceWorkerController
);

router.put(
  "/:id/workers",
  authenticateToken,
  checkRole("admin", "store_owner"),
  updateServiceWorkersController
);

export default router;
