import prisma from "../../prisma/client.js";
import jwt from "jsonwebtoken";

export function checkRole(...allowedRoles) {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ message: "Token eksik" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ decoded token:", decoded);

      // Kullanıcının rollerini çek
      const userWithRoles = await prisma.user.findUnique({
        where: { id: decoded.userId },
        include: {
          roles: {
            include: {
              role: true,
            },
          },
        },
      });
      console.log("✅ userWithRoles:", userWithRoles);

      const userRoles = userWithRoles.roles.map((ur) => ur.role.name);

      const hasAccess = allowedRoles.some((role) => userRoles.includes(role));
      console.log("👉 Kullanıcının roller:", userRoles);
      console.log("👉 Gerekli roller:", allowedRoles);
      console.log("👉 Erişim var mı?", hasAccess);

      if (!hasAccess) {
        return res
          .status(403)
          .json({ message: "Erişim reddedildi. Yetersiz rol." });
      }

      req.user = decoded;
      next();
    } catch (error) {
      console.error("Rol kontrol hatası:", error);
      return res.status(401).json({ message: "Geçersiz token" });
    }
  };
}
