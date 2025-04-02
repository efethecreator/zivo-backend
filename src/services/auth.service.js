// src/services/auth.service.js
import bcrypt from "bcrypt";
import {
  findUserByEmail,
  findUserByIdWithProfileAndRoles,
  createUser,
  findRoleByName,
  createUserRole,
} from "../repositories/auth.repository.js";
import { generateToken } from "../utils/jwt.js";

export async function registerUser({ fullName, email, password, userType }) {
  const allowedRoles = ["customer", "store_owner"];
  if (!allowedRoles.includes(userType)) {
    throw new Error("Geçersiz kullanıcı tipi");
  }

  const existing = await findUserByEmail(email);
  if (existing) throw new Error("Email zaten kayıtlı");

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await createUser({
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
  });

  const role = await findRoleByName(userType);
  if (!role) throw new Error("Rol bulunamadı");

  await createUserRole({ userId: user.id, roleId: role.id });

  const fullUser = await findUserByIdWithProfileAndRoles(user.id);
  return fullUser;
}

export async function loginUser(email, password) {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Kullanıcı bulunamadı");

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new Error("Şifre hatalı");

  const fullUser = await findUserByIdWithProfileAndRoles(user.id);
  if (!fullUser.profile?.id) {
    throw new Error("Kullanıcının profili eksik");
  }

  const token = generateToken({
    userId: fullUser.id,
    email: fullUser.email,
    profileId: fullUser.profile.id, // 👈 işte bu!
    role: fullUser.roles[0]?.role?.name || "unknown"
  });

  return {
    token,
    user: {
      id: fullUser.id,
      email: fullUser.email,
      fullName: fullUser.fullName,
      profileId: fullUser.profile.id,
      role: fullUser.roles[0]?.role?.name
    }
  };
}

export async function getMeById(userId) {
  const user = await findUserByIdWithProfileAndRoles(userId);
  if (!user) throw new Error("Kullanıcı bulunamadı");

  const { passwordHash, ...safeUser } = user;
  return safeUser;
}
