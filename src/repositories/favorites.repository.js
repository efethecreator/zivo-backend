import prisma from "../../prisma/client.js";

export const addFavorite = (data) => prisma.favorite.create({ data });

export const getFavoritesByCustomer = (customerId) =>
  prisma.favorite.findMany({
    where: {
      customerId,
      isDeleted: false,
    },
    include: {
      business: true,
    },
    orderBy: { createdAt: "desc" },
  });

export const softDeleteFavorite = (id, deletedBy) =>
  prisma.favorite.update({
    where: { id },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy,
    },
  });
