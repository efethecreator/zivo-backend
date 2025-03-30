import bcrypt from "bcrypt";
import prisma from "../../prisma/client.js";
import { generateToken } from "../utils/jwt.js";


export async function register(req, res) {
  const { fullName, email, password, userType } = req.body;

  try {
    const allowedRoles = ["customer", "store_owner"];
    if (!allowedRoles.includes(userType)) {
      return res.status(400).json({ message: "Geçersiz kullanıcı tipi" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Email zaten kayıtlı" });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        passwordHash,
        userType,
        isLawApproved: true,
        profile: {
          create: {
            phone: "",
            location: "",
            gender: "",
            biography: "",
            photoUrl: "",
          },
        },
      },
    });

    const role = await prisma.role.findUnique({ where: { name: userType } });
    if (!role) return res.status(500).json({ message: "Rol bulunamadı" });

    await prisma.userRole.create({
      data: {
        userId: user.id,
        roleId: role.id,
      },
    });

    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        profile: true,
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    res.status(201).json({ message: "Kayıt başarılı", user: fullUser });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Şifre hatalı" });

    const token = generateToken({
      userId: user.id,
      userType: user.userType,
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
}

export async function getMe(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId }, // burada dikkat!
      include: {
        profile: true,
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });

    const { passwordHash, ...safeUser } = user;
    res.status(200).json(safeUser);
  } catch (err) {
    console.error("GET /me error:", err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
}
