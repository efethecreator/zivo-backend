import express from "express";
import {
  createBusinessContactController,
  getBusinessContactsController,
  updateBusinessContactController,
  deleteBusinessContactController,
} from "../controllers/businessContact.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  checkRole("store_owner", "admin"),
  createBusinessContactController
);

router.get(
  "/business/:businessId",
  authenticateToken,
  checkRole("store_owner", "admin", "customer"),
  getBusinessContactsController
);

router.put(
  "/:id",
  authenticateToken,
  checkRole("store_owner", "admin"),
  updateBusinessContactController
);

router.delete(
  "/:id",
  authenticateToken,
  checkRole("store_owner", "admin"),
  deleteBusinessContactController
);

export default router;
