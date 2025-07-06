import express from "express";
import {
  createPortfolioController,
  getPortfoliosController,
  updatePortfolioController,
  deletePortfolioController,
} from "../controllers/portfolio.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";
import upload from "../services/uploadService.js";

const router = express.Router();


router.get("/public/business/:businessId", getPortfoliosController);

router.post(
  "/",
  authenticateToken,
  checkRole("store_owner"),
  upload.single("image"),
  createPortfolioController
);

router.get(
  "/business/:businessId",
  authenticateToken,
  checkRole("store_owner", "admin"),
  getPortfoliosController
);

router.put(
  "/:id",
  authenticateToken,
  checkRole("store_owner", "admin"),
  updatePortfolioController
);

router.delete(
  "/:id",
  authenticateToken,
  checkRole("store_owner", "admin"),
  deletePortfolioController
);

export default router;
