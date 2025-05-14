import {
  addWorkerType,
  listWorkerTypes,
  getWorkerType,
  editWorkerType,
  removeWorkerType,
} from "../services/workerType.service.js";

export const createWorkerTypeController = async (req, res) => {
  try {
    const created = await addWorkerType(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllWorkerTypesController = async (req, res) => {
  try {
    const list = await listWorkerTypes();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWorkerTypeByIdController = async (req, res) => {
  try {
    const item = await getWorkerType(req.params.id);
    if (!item || item.isDeleted)
      return res.status(404).json({ message: "Bulunamadı" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateWorkerTypeController = async (req, res) => {
  try {
    const updated = await editWorkerType(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteWorkerTypeController = async (req, res) => {
  try {
    await removeWorkerType(req.params.id, req.user.userId);
    res.json({ message: "Görev türü soft silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
