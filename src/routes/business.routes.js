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
import { aws3UploadFields } from "../middleware/aws3Upload.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  checkRole("store_owner"),
  aws3UploadFields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  createBusinessController
);

router.get("/", getAllBusinessesController);
router.get("/:id", getBusinessByIdController);

router.put(
  "/:id",
  authenticateToken,
  checkRole("store_owner", "admin"),
  aws3UploadFields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  updateBusinessController
);

router.delete(
  "/:id",
  authenticateToken,
  checkRole("admin"),
  deleteBusinessController
);

export default router;
