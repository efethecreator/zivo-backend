import express from "express";
import {
  createPortfolioController,
  getPortfoliosController,
  updatePortfolioController,
  deletePortfolioController,
} from "../controllers/portfolio.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";

const router = express.Router();

// 🔓 PUBLIC: Kullanıcılar mağaza portfolyosunu görüntüleyebilir
router.get("/public/business/:businessId", getPortfoliosController);

// 🔐 PORTFOLYO EKLEME
router.post(
  "/",
  authenticateToken,
  checkRole("store_owner", "admin"),
  createPortfolioController
);

// 🔐 PORTFOLYO GET (Yönetici paneli için)
router.get(
  "/business/:businessId",
  authenticateToken,
  checkRole("store_owner", "admin"),
  getPortfoliosController
);

// 🔐 PORTFOLYO GÜNCELLE
router.put(
  "/:id",
  authenticateToken,
  checkRole("store_owner", "admin"),
  updatePortfolioController
);

// 🔐 PORTFOLYO SİL (soft delete)
router.delete(
  "/:id",
  authenticateToken,
  checkRole("store_owner", "admin"),
  deletePortfolioController
);

export default router;
