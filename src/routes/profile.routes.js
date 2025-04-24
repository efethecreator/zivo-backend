import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";
import { updateProfile } from "../controllers/profile.controller.js";
import { aws3UploadSingle } from "../middleware/aws3Upload.middleware.js";

const router = express.Router();

router.put(
  "/",
  authenticateToken,
  checkRole("customer", "store_owner", "admin"),
  aws3UploadSingle("image"),
  updateProfile
);

export default router;
