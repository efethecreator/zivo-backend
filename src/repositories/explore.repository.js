import prisma from "../../prisma/client.js";

export const getNearbyBusinessesRaw = async (lat, lng, radius) => {
  return await prisma.$queryRaw`
      SELECT * FROM (
        SELECT 
          b.*, 
          (
            6371 * acos(
              cos(radians(${lat})) *
              cos(radians(b.latitude)) *
              cos(radians(b.longitude) - radians(${lng})) +
              sin(radians(${lat})) *
              sin(radians(b.latitude))
            )
          ) AS distance
        FROM businesses b
        WHERE b."isDeleted" = false
      ) AS nearby
      WHERE distance < ${radius}
      ORDER BY distance ASC
    `;
};

export const getFilteredBusinessesRaw = async (search, type, sortBy) => {
  let baseQuery = `
      SELECT * FROM businesses b
      WHERE b."isDeleted" = false
    `;

  if (search) {
    baseQuery += ` AND (b.name ILIKE '%${search}%' OR b.description ILIKE '%${search}%')`;
  }

  if (type) {
    baseQuery += ` AND b."businessTypeId" = '${type}'`;
  }

  const sortColumn =
    sortBy === "name"
      ? `"name"`
      : sortBy === "createdAt"
      ? `"createdAt"`
      : `"name"`;
  baseQuery += ` ORDER BY ${sortColumn} ASC`;

  return await prisma.$queryRawUnsafe(baseQuery);
};
