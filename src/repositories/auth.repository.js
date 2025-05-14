// src/repositories/auth.repository.js
import prisma from "../../prisma/client.js";

export const findUserByEmail = (email) =>
  prisma.user.findUnique({ where: { email } });

export const findUserByIdWithProfileAndRoles = (id) =>
  prisma.user.findUnique({
    where: { id },
    include: {
      profile: true,
      roles: { include: { role: true } },
    },
  });

export const createUser = (data) => prisma.user.create({ data });

export const findRoleByName = (name) =>
  prisma.role.findUnique({ where: { name } });

export const createUserRole = (data) => prisma.userRole.create({ data });
