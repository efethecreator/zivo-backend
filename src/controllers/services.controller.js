// src/controllers/services.controller.js
import {
  createService,
  getAllServicesService,
  getServiceByIdService,
  updateServiceByIdService,
  deleteServiceByIdService,
  getServiceByBusinessIdService,
  assignWorkersToService,
  getServiceWorkers,
  softRemoveWorkerFromService,
  updateServiceWorkersService,
} from "../services/services.service.js";

export const createServiceController = async (req, res) => {
  try {
    const service = await createService({
      ...req.body,
      businessId: req.body.businessId,
    });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllServicesController = async (req, res) => {
  try {
    const { businessId } = req.query;
    const services = await getAllServicesService(businessId);
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getServiceByIdController = async (req, res) => {
  try {
    const service = await getServiceByIdService(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateServiceController = async (req, res) => {
  try {
    const updated = await updateServiceByIdService(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteServiceController = async (req, res) => {
  try {
    await deleteServiceByIdService(req.params.id, req.user.userId);
    res.json({ message: "Service soft silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getServiceByBusinessIdController = async (req, res) => {
  try {
    const { businessId } = req.params;
    const services = await getServiceByBusinessIdService(businessId);
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const assignWorkersToServiceController = async (req, res) => {
  try {
    const { id: serviceId } = req.params;
    const { workerIds } = req.body; // workerIds: string[]

    if (!Array.isArray(workerIds) || workerIds.length === 0) {
      return res
        .status(400)
        .json({ error: "workerIds gerekli ve dizi olmalı" });
    }

    const result = await assignWorkersToService(serviceId, workerIds);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Servise atanmış çalışanları getir (GET /services/:id/workers)
export const getServiceWorkersController = async (req, res) => {
  try {
    const { id: serviceId } = req.params;
    const workers = await getServiceWorkers(serviceId);
    res.status(200).json(workers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Servisten çalışanı sil (DELETE /services/:id/workers/:workerId)
export const removeServiceWorkerController = async (req, res) => {
  try {
    const { id: serviceId, workerId } = req.params;
    const result = await softRemoveWorkerFromService(
      serviceId,
      workerId,
      req.user.userId
    );
    res.status(200).json({ message: "Çalışan servisten çıkarıldı", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateServiceWorkersController = async (req, res) => {
  const { id: serviceId } = req.params;
  const { workerIds } = req.body;

  if (!Array.isArray(workerIds)) {
    return res.status(400).json({ error: "workerIds must be an array" });
  }

  try {
    await updateServiceWorkersService(serviceId, workerIds);
    res.status(200).json({ message: "Service workers updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
