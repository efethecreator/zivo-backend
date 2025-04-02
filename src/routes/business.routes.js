import express from "express";
import {
  createBusinessController,
  getAllBusinessesController,
  getBusinessByIdController,
  updateBusinessController,
  deleteBusinessController,
} from "../controllers/business.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  checkRole("store_owner"),
  createBusinessController
);

router.get("/", getAllBusinessesController);
router.get("/:id", getBusinessByIdController);

router.put(
  "/:id",
  authenticateToken,
  checkRole("store_owner", "admin"),
  updateBusinessController
);

router.delete(
  "/:id",
  authenticateToken,
  checkRole("admin"),
  deleteBusinessController
);

export default router;
