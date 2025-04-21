import {
    createService,
    getAllServicesService,
    getServiceByIdService,
    updateServiceByIdService,
    deleteServiceByIdService,
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
      const { businessId } = req.query;
      const services = await getAllServicesService(businessId);
      res.json(services);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
