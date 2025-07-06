// src/services/services.service.js
import {
  createService as createRepo,
  getAllServices,
  getServiceById,
  getServiceByBusinessId,
  updateService,
  softDeleteService,
  addWorkersToService,
  getWorkersByServiceId,
  removeWorkerFromService,
  deleteServiceWorkersByServiceId,
  createServiceWorkerMany,
} from "../repositories/services.repository.js";

export const createService = async (data) => {
  return await createRepo(data);
};

export const getAllServicesService = async (businessId) => {
  return await getAllServices(businessId);
};

export const getServiceByIdService = async (id) => {
  return await getServiceById(id);
};

export const getServiceByBusinessIdService = async (businessId) => {
  return await getServiceByBusinessId(businessId);
};

export const updateServiceByIdService = async (id, data) => {
  return await updateService(id, data);
};

export const deleteServiceByIdService = async (id, deletedBy) => {
  return await softDeleteService(id, deletedBy);
};

export const assignWorkersToService = async (serviceId, workerIds) => {
  return await addWorkersToService(serviceId, workerIds);
};

export const getServiceWorkers = async (serviceId) => {
  return await getWorkersByServiceId(serviceId);
};

export const softRemoveWorkerFromService = async (
  serviceId,
  workerId,
  deletedBy
) => {
  return await removeWorkerFromService(serviceId, workerId, deletedBy);
};

export const updateServiceWorkersService = async (serviceId, workerIds) => {
  await deleteServiceWorkersByServiceId(serviceId);

  if (workerIds.length > 0) {
    const data = workerIds.map((workerId) => ({
      serviceId,
      workerId,
    }));
    await createServiceWorkerMany(data);
  }
};
