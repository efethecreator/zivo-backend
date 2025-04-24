import {
  createBusiness,
  getAllBusinessesService,
  getBusinessByIdService,
  updateBusinessService,
  deleteBusinessService,
} from "../services/business.service.js";

import { uploadToS3 } from "../services/uploadService.js"; // AWS S3 upload fonksiyonu

export const createBusinessController = async (req, res) => {
  try {
    const profileImageFile = req.files?.profileImage?.[0];
    const coverImageFile = req.files?.coverImage?.[0];

    let profileImageUrl = "";
    let coverImageUrl = "";

    if (profileImageFile) {
      profileImageUrl = await uploadToS3(
        profileImageFile.buffer,
        profileImageFile.originalname,
        profileImageFile.mimetype
      );
    }

    if (coverImageFile) {
      coverImageUrl = await uploadToS3(
        coverImageFile.buffer,
        coverImageFile.originalname,
        coverImageFile.mimetype
      );
    }

    const data = {
      ...req.body,
      ownerId: req.user.profileId,
      profileImageUrl,
      coverImageUrl,
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

    // 👮‍♂️ Yetki kontrolü
    const existing = await getBusinessByIdService(id);
    if (!existing) return res.status(404).json({ message: "Business bulunamadı" });

    if (req.user.role !== "admin" && req.user.profileId !== existing.ownerId) {
      return res.status(403).json({ message: "Yetkisiz erişim" });
    }

    // 🖼 Görsel güncelleme varsa S3'e upload et
    const profileImageFile = req.files?.profileImage?.[0];
    const coverImageFile = req.files?.coverImage?.[0];

    let updateData = {
      ...req.body,
    };

    if (profileImageFile) {
      const profileUrl = await uploadToS3(
        profileImageFile.buffer,
        profileImageFile.originalname,
        profileImageFile.mimetype
      );
      updateData.profileImageUrl = profileUrl;
    }

    if (coverImageFile) {
      const coverUrl = await uploadToS3(
        coverImageFile.buffer,
        coverImageFile.originalname,
        coverImageFile.mimetype
      );
      updateData.coverImageUrl = coverUrl;
    }

    const updated = await updateBusinessService(id, updateData);
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
