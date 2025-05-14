import { getNearbyBusinessesService, getFilteredBusinessesService } from "../services/explore.service.js";

export const getNearbyBusinessesController = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;

    if (!lat || !lng || !radius) {
      return res.status(400).json({ message: "lat, lng ve radius gerekli" });
    }

    const businesses = await getNearbyBusinessesService({
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      radius: parseFloat(radius),
    });

    res.json(businesses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFilteredBusinessesController = async (req, res) => {
  try {
    const { search, type, sortBy } = req.query;

    const businesses = await getFilteredBusinessesService({
      search,
      type,
      sortBy,
    });

    res.json(businesses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
