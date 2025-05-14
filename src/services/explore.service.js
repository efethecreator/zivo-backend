import { getNearbyBusinessesRaw, getFilteredBusinessesRaw } from "../repositories/explore.repository.js";

export const getNearbyBusinessesService = async ({ lat, lng, radius }) => {
  return await getNearbyBusinessesRaw(lat, lng, radius);
};

export const getFilteredBusinessesService = async ({
  search,
  type,
  sortBy,
}) => {
  return await getFilteredBusinessesRaw(search, type, sortBy);
};
