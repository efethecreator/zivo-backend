import express from "express";
import { getNearbyBusinessesController, getFilteredBusinessesController } from "../controllers/explore.controller.js";

const router = express.Router();


router.get("/nearby", getNearbyBusinessesController);

router.get("/search", getFilteredBusinessesController);

export default router;
