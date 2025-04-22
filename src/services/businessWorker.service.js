import {
  createBusinessWorker,
  getBusinessWorkersByBusinessId,
  getBusinessWorkerById,
  updateBusinessWorker,
  softDeleteBusinessWorker,
} from "../repositories/businessWorker.repository.js";

export const createWorker = async (data) => await createBusinessWorker(data);

export const getWorkersOfBusiness = async (businessId) =>
  await getBusinessWorkersByBusinessId(businessId);

export const getWorker = async (id) => await getBusinessWorkerById(id);

export const updateWorker = async (id, data) =>
  await updateBusinessWorker(id, data);

export const deleteWorker = async (id, deletedBy) =>
  await softDeleteBusinessWorker(id, deletedBy);
