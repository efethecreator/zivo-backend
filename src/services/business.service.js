// src/services/business.service.js
import {
  createBusiness as createBusinessRepo,
  getAllBusinesses,
  getBusinessById,
  updateBusiness,
  softDeleteBusiness,
} from "../repositories/business.repository.js";

export const createBusiness = async (data) => {
  return await createBusinessRepo(data);
};

export const getAllBusinessesService = async () => {
  return await getAllBusinesses();
};

export const getBusinessByIdService = async (id) => {
  return await getBusinessById(id);
};

export const updateBusinessService = async (id, data) => {
  return await updateBusiness(id, data);
};

export const deleteBusinessService = async (id, deletedBy) => {
  return await softDeleteBusiness(id, deletedBy);
};
