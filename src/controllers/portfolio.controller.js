import {
    addPortfolioItem,
    getPortfolioList,
    updatePortfolioItem,
    deletePortfolioItem,
  } from "../services/portfolio.service.js";
  
  export const createPortfolioController = async (req, res) => {
    try {
      const data = {
        businessId: req.body.businessId,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
      };
      const created = await addPortfolioItem(data);
      res.status(201).json(created);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const getPortfoliosController = async (req, res) => {
    try {
      const portfolios = await getPortfolioList(req.params.businessId);
      res.json(portfolios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const updatePortfolioController = async (req, res) => {
    try {
      const updated = await updatePortfolioItem(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const deletePortfolioController = async (req, res) => {
    try {
      await deletePortfolioItem(req.params.id, req.user.userId);
      res.json({ message: "Görsel kaldırıldı" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  