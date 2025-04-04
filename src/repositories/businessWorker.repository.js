import prisma from "../../prisma/client.js";

export const createBusinessWorker = (data) => prisma.businessWorker.create({ data });

export const getBusinessWorkers = (businessId) =>
  prisma.businessWorker.findMany({
    where: {
      businessId,
      isDeleted: false,
    },
    include: {
      user: true,         
      workerType: true,   
    },
  });

export const updateWorkerType = (id, workerTypeId) =>
  prisma.businessWorker.update({
    where: { id },
    data: { workerTypeId },
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
