import {
  createWorkerType,
  getAllWorkerTypes,
  getWorkerTypeById,
  updateWorkerType,
  softDeleteWorkerType,
} from "../repositories/workerType.repository.js";

export const addWorkerType = async (data) => {
  return await createWorkerType(data);
};

export const listWorkerTypes = async () => {
  return await getAllWorkerTypes();
};

export const getWorkerType = async (id) => {
  return await getWorkerTypeById(id);
};

export const editWorkerType = async (id, data) => {
  return await updateWorkerType(id, data);
};

export const removeWorkerType = async (id, deletedBy) => {
  return await softDeleteWorkerType(id, deletedBy);
};
