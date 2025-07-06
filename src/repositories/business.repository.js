// src/repositories/business.repository.js
import prisma from "../../prisma/client.js";

export const createBusiness = (data) => prisma.business.create({ data });

export const getAllBusinesses = () =>
  prisma.business.findMany({ where: { isDeleted: false } });

export const getBusinessById = (id) =>
  prisma.business
    .findUnique({
      where: { id },
      include: {
        contacts: true, 
        shifts: {
          where: { isDeleted: false },
          include: {
            shiftTime: true, 
          },
        },
        businessType: true,
      },
    })
    .then((business) => {
      if (!business || business.isDeleted) return null;
      return business;
    });

export const updateBusiness = (id, data) =>
  prisma.business.update({ where: { id }, data });

export const softDeleteBusiness = (id, deletedBy) =>
  prisma.business.update({
    where: { id },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy: deletedBy,
    },
  });
