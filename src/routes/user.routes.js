import express from "express";
import { checkRole } from "../middleware/role.middleware.js";
import {
  getAllUsers,
  getUserById,
  deleteUserById,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", checkRole("admin"), getAllUsers);
router.get("/:id", checkRole("admin"), getUserById);
router.delete("/:id", checkRole("admin"), deleteUserById);

export default router;
