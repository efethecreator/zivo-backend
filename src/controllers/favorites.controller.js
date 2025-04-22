import {
  addFavoriteService,
  getMyFavoritesService,
  deleteFavoriteService,
} from "../services/favorites.service.js";

export const addFavoriteController = async (req, res) => {
  try {
    const data = {
      customerId: req.user.profileId,
      businessId: req.body.businessId,
    };
    const created = await addFavoriteService(data);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyFavoritesController = async (req, res) => {
  try {
    const favorites = await getMyFavoritesService(req.user.profileId);
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteFavoriteController = async (req, res) => {
  try {
    await deleteFavoriteService(req.params.id, req.user.userId);
    res.json({ message: "Favori mağaza kaldırıldı" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
