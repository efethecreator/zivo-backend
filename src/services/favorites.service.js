import {
  addFavorite,
  getFavoritesByCustomer,
  softDeleteFavorite,
} from "../repositories/favorites.repository.js";

export const addFavoriteService = async (data) => {
  return await addFavorite(data);
};

export const getMyFavoritesService = async (customerId) => {
  return await getFavoritesByCustomer(customerId);
};

export const deleteFavoriteService = async (id, deletedBy) => {
  return await softDeleteFavorite(id, deletedBy);
};
