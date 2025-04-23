import {
    addShiftTimeService,
    getShiftTimesService,
    updateShiftTimeService,
    deleteShiftTimeService,
  } from "../services/shiftTime.service.js";
  
  export const createShiftTimeController = async (req, res) => {
    try {
      const { startTime, endTime } = req.body;
      const created = await addShiftTimeService({ startTime, endTime });
      res.status(201).json(created);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const getShiftTimesController = async (req, res) => {
    try {
      const list = await getShiftTimesService();
      res.json(list);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const updateShiftTimeController = async (req, res) => {
    try {
      const updated = await updateShiftTimeService(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const deleteShiftTimeController = async (req, res) => {
    try {
      await deleteShiftTimeService(req.params.id, req.user.userId);
      res.json({ message: "Shift zamanı silindi" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  