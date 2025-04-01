import prisma from "../../prisma/client.js";

export const findProfileByUserId = (userId) =>
  prisma.profile.findUnique({ where: { userId } });

export const updateProfileByUserId = (userId, data) =>
  prisma.profile.update({
    where: { userId },
    data,
  });
