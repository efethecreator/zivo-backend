// File: src/repositories/services.repository.js
import prisma from "../../prisma/client.js";

export const createService = (data) => prisma.service.create({ data });

export const getAllServices = (businessId) =>
  prisma.service.findMany({
    where: { businessId, isDeleted: false },
  });

export const getServiceById = (id) =>
  prisma.service
    .findUnique({
      where: { id },
    })
    .then((service) => {
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

export const getServiceByBusinessId = (businessId) =>
  prisma.service.findMany({
    where: { businessId, isDeleted: false },
  });

export const addWorkersToService = async (serviceId, workerIds) => {
  const data = workerIds.map((workerId) => ({
    serviceId,
    workerId,
  }));
  return await prisma.serviceWorker.createMany({ data, skipDuplicates: true });
};

export const getWorkersByServiceId = async (serviceId) => {
  return await prisma.serviceWorker.findMany({
    where: { serviceId, isDeleted: false },
    include: { worker: true },
  });
};

export const removeWorkerFromService = async (
  serviceId,
  workerId,
  deletedBy
) => {
  return await prisma.serviceWorker.updateMany({
    where: { serviceId, workerId },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy,
    },
  });
};

export const deleteServiceWorkersByServiceId = (serviceId) =>
  prisma.serviceWorker.deleteMany({
    where: { serviceId },
  });

export const createServiceWorkerMany = (data) =>
  prisma.serviceWorker.createMany({
    data,
    skipDuplicates: true,
  });
