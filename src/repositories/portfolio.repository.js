import prisma from "../../prisma/client.js";

export const createPortfolio = (data) =>
  prisma.portfolio.create({ data });

export const getPortfoliosByBusiness = (businessId) =>
  prisma.portfolio.findMany({
    where: {
      businessId,
      isDeleted: false,
    },
    orderBy: { uploadedAt: "desc" },
  });

export const updatePortfolio = (id, data) =>
  prisma.portfolio.update({
    where: { id },
    data,
  });

export const softDeletePortfolio = (id, deletedBy) =>
  prisma.portfolio.update({
    where: { id },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy,
    },
  });
