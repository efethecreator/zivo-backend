import express from "express";
import {
  createReviewController,
  getReviewsByBusinessController,
  getMyReviewsController,
  updateReviewController,
  deleteReviewController,
} from "../controllers/review.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  checkRole("customer"),
  createReviewController
);

router.get("/business/:businessId", getReviewsByBusinessController);

router.get(
  "/my",
  authenticateToken,
  checkRole("customer"),
  getMyReviewsController
);

router.put(
  "/:id",
  authenticateToken,
  checkRole("customer"),
  updateReviewController
);

router.delete(
  "/:id",
  authenticateToken,
  checkRole("customer", "admin"),
  deleteReviewController
);

export default router;
