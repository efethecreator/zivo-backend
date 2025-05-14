import express from "express";
import { checkRole } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/admin-test", checkRole("admin"), (req, res) => {
  res.json({
    message: "Admin yetkisi onaylandı. Bu veriye erişimin var ✅",
    userId: req.user.userId,
  });
});

export default router;
