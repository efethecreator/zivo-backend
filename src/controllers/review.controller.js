import {
    createReviewService,
    getBusinessReviewsService,
    getCustomerReviewsService,
    updateReviewService,
    deleteReviewService,
  } from "../services/review.service.js";
  
  export const createReviewController = async (req, res) => {
    try {
      const review = await createReviewService(req.user, req.body);
      res.status(201).json(review);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  export const getReviewsByBusinessController = async (req, res) => {
    try {
      const list = await getBusinessReviewsService(req.params.businessId);
      res.json(list);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const getMyReviewsController = async (req, res) => {
    try {
      const list = await getCustomerReviewsService(req.user.profileId);
      res.json(list);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const updateReviewController = async (req, res) => {
    try {
      const updated = await updateReviewService(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const deleteReviewController = async (req, res) => {
    try {
      await deleteReviewService(req.params.id, req.user.userId);
      res.json({ message: "Yorum silindi" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  