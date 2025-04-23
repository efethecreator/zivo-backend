import {
    createBusinessShift,
    getShiftsByBusinessId,
    updateBusinessShift,
    softDeleteBusinessShift,
  } from "../repositories/businessShift.repository.js";
  
  export const addBusinessShiftService = async (data) => await createBusinessShift(data);
  
  export const getShiftsService = async (businessId) =>
    await getShiftsByBusinessId(businessId);
  
  export const updateShiftService = async (id, data) =>
    await updateBusinessShift(id, data);
  
  export const deleteShiftService = async (id, deletedBy) =>
    await softDeleteBusinessShift(id, deletedBy);
  