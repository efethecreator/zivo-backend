import prisma from "../../prisma/client.js";

export const createBusinessWorker = (data) =>
  prisma.businessWorker.create({ data });

export const getBusinessWorkersByBusinessId = (businessId) =>
  prisma.businessWorker.findMany({
    where: { businessId, isDeleted: false },
    include: { workerType: true }
  });

export const getBusinessWorkerById = (id) =>
  prisma.businessWorker.findUnique({ where: { id } });

export const updateBusinessWorker = (id, data) =>
  prisma.businessWorker.update({
    where: { id },
    data,
  });

export const softDeleteBusinessWorker = (id, deletedBy) =>
  prisma.businessWorker.update({
    where: { id },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy,
    },
  });
