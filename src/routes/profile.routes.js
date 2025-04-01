import express from "express";
import { updateProfile } from "../controllers/profile.controller.js";
import { checkRole } from "../middleware/role.middleware.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.put(
  "/",
  authenticateToken,
  checkRole("customer", "store_owner", "admin"),
  updateProfile
);

export default router;
