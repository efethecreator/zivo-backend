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

      const userRoles = userWithRoles.roles.map((ur) => ur.role.name);

      const hasAccess = allowedRoles.some((role) => userRoles.includes(role));
      if (!hasAccess) {
        return res.status(403).json({ message: "Erişim reddedildi. Yetersiz rol." });
      }

      req.user = decoded;
      next();
    } catch (error) {
      console.error("Rol kontrol hatası:", error);
      return res.status(401).json({ message: "Geçersiz token" });
    }
  };
}
