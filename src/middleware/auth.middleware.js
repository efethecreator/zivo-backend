import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "gizli_key";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token eksik" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Geçersiz token" });
    req.user = user; 
    next();
  });
}
