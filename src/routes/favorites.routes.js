import express from "express";
import {
  addFavoriteController,
  getMyFavoritesController,
  deleteFavoriteController,
} from "../controllers/favorites.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  checkRole("customer"),
  addFavoriteController
);

router.get(
  "/my",
  authenticateToken,
  checkRole("customer"),
  getMyFavoritesController
);

router.delete(
  "/:id",
  authenticateToken,
  checkRole("customer"),
  deleteFavoriteController
);

export default router;
