import prisma from "../../prisma/client.js";

export const findAllUsers = () =>
  prisma.user.findMany({
    include: {
      profile: true,
      roles: { include: { role: true } },
    },
  });

export const findUserById = (id) =>
  prisma.user.findUnique({
    where: { id },
    include: {
      profile: true,
      roles: { include: { role: true } },
    },
  });

export const deleteUser = (id) => prisma.user.delete({ where: { id } });

export const deleteUserRoles = (userId) =>
  prisma.userRole.deleteMany({ where: { userId } });

export const deleteUserProfile = (userId) =>
  prisma.profile.delete({ where: { userId } });

export const updateUser = (id, data) =>
  prisma.user.update({
    where: { id },
    data,
  });
