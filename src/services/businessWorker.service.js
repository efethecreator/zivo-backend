import {
    createBusinessWorker,
    getBusinessWorkers,
    updateWorkerType,
    softDeleteBusinessWorker,
  } from "../repositories/businessWorker.repository.js";
  
  export const addWorkerToBusiness = async (data) => {
    return await createBusinessWorker(data);
  };
  
  export const getWorkersOfBusiness = async (businessId) => {
    return await getBusinessWorkers(businessId);
  };
  
  export const updateWorkerRole = async (id, workerTypeId) => {
    return await updateWorkerType(id, workerTypeId);
  };
  
  export const removeWorker = async (id, deletedBy) => {
    return await softDeleteBusinessWorker(id, deletedBy);
  };
  