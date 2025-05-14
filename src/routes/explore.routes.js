import express from "express";
import { getNearbyBusinessesController, getFilteredBusinessesController } from "../controllers/explore.controller.js";

const router = express.Router();

// GET /explore/nearby?lat=41.1&lng=29.0&radius=5
router.get("/nearby", getNearbyBusinessesController);

router.get("/search", getFilteredBusinessesController);

export default router;
