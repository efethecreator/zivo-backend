import {
    createService as createRepo,
    getAllServices,
    getServiceById,
    getServiceByBusinessId,
    updateService,
    softDeleteService,
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
  }
  
  export const updateServiceByIdService = async (id, data) => {
    return await updateService(id, data);
  };
  
  export const deleteServiceByIdService = async (id, deletedBy) => {
    return await softDeleteService(id, deletedBy);
  };
  