import express from "express";
import {
  createServiceController,
  getAllServicesController,
  getServiceByIdController,
  updateServiceController,
  deleteServiceController,
  getServiceByBusinessIdController
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

export default router;
