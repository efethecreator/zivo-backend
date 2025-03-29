import bcrypt from "bcrypt";
import prisma from "../../prisma/client.js";
import { generateToken } from "../utils/jwt.js";


export async function register(req, res) {
  const { fullName, email, password, userType } = req.body;

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email zaten kayıtlı" });

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
      include: { profile: true },
    });

    res.status(201).json({ message: "Kayıt başarılı", user });
  } catch (err) {
    console.error(err);
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

    const token = generateToken({ id: user.id, userType: user.userType });
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
}


export async function getMe(req, res) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        include: {
          profile: true,
          roles: {
            include: {
              role: true,
            },
          },
        },
      });
  
      if (!user) {
        return res.status(404).json({ message: "Kullanıcı bulunamadı" });
      }
  
      const { passwordHash, ...safeUser } = user;
  
      res.status(200).json(safeUser);
    } catch (error) {
      console.error("GET /me error:", error);
      res.status(500).json({ message: "Sunucu hatası" });
    }
  }