import prisma from "../../prisma/client.js";

export const createBusinessContact = (data) =>
  prisma.businessContact.create({ data });

export const getContactsByBusinessId = (businessId) =>
  prisma.businessContact.findMany({
    where: {
      businessId,
      isDeleted: false,
    },
    orderBy: { contactName: "asc" },
  });

export const updateBusinessContact = (id, data) =>
  prisma.businessContact.update({
    where: { id },
    data,
  });

export const softDeleteBusinessContact = (id, deletedBy) =>
  prisma.businessContact.update({
    where: { id },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy,
    },
  });
