import express from "express";
import {
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  updateOwnUser,
} from "../controllers/user.controller.js";
import { checkRole } from "../middleware/role.middleware.js";


const router = express.Router();

router.get("/", checkRole("admin"), getAllUsers);
router.get("/:id", checkRole("admin"), getUserById);
router.delete("/:id", checkRole("admin"), deleteUserById);
router.put("/me", checkRole("customer", "store_owner", "admin"), updateOwnUser);
router.put("/:id", checkRole("admin"), updateUserById); // Admin başkasını günceller


export default router;
