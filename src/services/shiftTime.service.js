import {
    createShiftTime,
    getAllShiftTimes,
    updateShiftTime,
    softDeleteShiftTime,
  } from "../repositories/shiftTime.repository.js";
  
  export const addShiftTimeService = async (data) => await createShiftTime(data);
  
  export const getShiftTimesService = async () => await getAllShiftTimes();
  
  export const updateShiftTimeService = async (id, data) =>
    await updateShiftTime(id, data);
  
  export const deleteShiftTimeService = async (id, deletedBy) =>
    await softDeleteShiftTime(id, deletedBy);
  