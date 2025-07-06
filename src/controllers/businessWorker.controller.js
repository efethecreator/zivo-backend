import {
  createWorker,
  getWorkersOfBusiness,
  getWorker,
  updateWorker,
  deleteWorker,
} from "../services/businessWorker.service.js";

export const createWorkerController = async (req, res) => {
  try {
    const data = req.body;
    const worker = await createWorker(data);
    res.status(201).json(worker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWorkersController = async (req, res) => {
  try {
    const list = await getWorkersOfBusiness(req.params.businessId);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWorkerByIdController = async (req, res) => {
  try {
    const worker = await getWorker(req.params.id);
    if (!worker) return res.status(404).json({ message: "Çalışan bulunamadı" });
    res.json(worker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateWorkerController = async (req, res) => {
  try {
    const updated = await updateWorker(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteWorkerController = async (req, res) => {
  try {
    await deleteWorker(req.params.id, req.user.userId); 
    res.json({ message: "Çalışan soft silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
