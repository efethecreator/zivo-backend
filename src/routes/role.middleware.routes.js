import express from "express";
import { checkRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/admin-only", checkRole("admin"), (req, res) => {
  res.json({ message: "Sadece admin kullanıcılar burayı görebilir" });
});

router.get("/owner-or-admin", checkRole("store_owner", "admin"), (req, res) => {
  res.json({ message: "Hem mağaza sahibi hem admin görebilir" });
});

export default router;
