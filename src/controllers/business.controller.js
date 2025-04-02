import {
  createBusiness,
  getAllBusinessesService,
  getBusinessByIdService,
  updateBusinessService,
  deleteBusinessService,
} from "../services/business.service.js";

export const createBusinessController = async (req, res) => {
  try {
    const data = {
      ...req.body,
      ownerId: req.user.profileId, 
    };
    const business = await createBusiness(data);
    res.status(201).json(business);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllBusinessesController = async (req, res) => {
  try {
    const businesses = await getAllBusinessesService();
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBusinessByIdController = async (req, res) => {
  try {
    const business = await getBusinessByIdService(req.params.id);
    if (!business)
      return res.status(404).json({ message: "Business not found" });
    res.json(business);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBusinessController = async (req, res) => {
  try {
    const { id } = req.params;

    
    if (req.user.role !== "admin" && req.user.profileId !== req.body.ownerId) {
      return res.status(403).json({ message: "Yetkisiz erişim" });
    }

    const updated = await updateBusinessService(id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBusinessController = async (req, res) => {
  try {
    await deleteBusinessService(req.params.id, req.user.userId);
    res.json({ message: "Business soft silindi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
