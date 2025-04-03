import prisma from "../../prisma/client.js";

export const createService = (data) => prisma.service.create({ data });

export const getAllServices = (businessId) =>
  prisma.service.findMany({
    where: { businessId, isDeleted: false },
  });

export const getServiceById = (id) =>
  prisma.service.findUnique({
    where: { id },
  }).then(service => {
    if (!service || service.isDeleted) return null;
    return service;
  });

export const updateService = (id, data) =>
  prisma.service.update({ where: { id }, data });

export const softDeleteService = (id, deletedBy) =>
  prisma.service.update({
    where: { id },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy,
    },
  });
