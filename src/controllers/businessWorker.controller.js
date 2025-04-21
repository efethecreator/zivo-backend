import {
    addWorkerToBusiness,
    getWorkersOfBusiness,
    updateWorkerRole,
    removeWorker,
  } from "../services/businessWorker.service.js";
  
  export const createBusinessWorkerController = async (req, res) => {
    try {
      const worker = await addWorkerToBusiness(req.body);
      res.status(201).json(worker);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const getBusinessWorkersController = async (req, res) => {
    try {
      const workers = await getWorkersOfBusiness(req.params.businessId);
      res.json(workers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  
  
  export const updateWorkerTypeController = async (req, res) => {
    try {
      const updated = await updateWorkerRole(req.params.id, req.body.workerTypeId);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const deleteBusinessWorkerController = async (req, res) => {
    try {
      await removeWorker(req.params.id, req.user.userId);
      res.json({ message: "Çalışan soft silindi" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  