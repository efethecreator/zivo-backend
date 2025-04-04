import prisma from "../../prisma/client.js";

export const createWorkerType = (data) => prisma.workerType.create({ data });

export const getAllWorkerTypes = () =>
  prisma.workerType.findMany({
    where: { isDeleted: false },
    orderBy: { name: "asc" },
  });

export const getWorkerTypeById = (id) =>
  prisma.workerType.findUnique({
    where: { id },
  });

export const updateWorkerType = (id, data) =>
  prisma.workerType.update({
    where: { id },
    data,
  });

export const softDeleteWorkerType = (id, deletedBy) =>
  prisma.workerType.update({
    where: { id },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy,
    },
  });
