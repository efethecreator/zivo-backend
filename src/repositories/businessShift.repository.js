import prisma from "../../prisma/client.js";

export const createBusinessShift = (data) =>
  prisma.businessShift.create({ data });

export const getShiftsByBusinessId = (businessId) =>
  prisma.businessShift.findMany({
    where: {
      businessId,
      isDeleted: false,
    },
    include: {
      shiftTime: true,
    },
    orderBy: { dayOfWeek: "asc" },
  });

export const updateBusinessShift = (id, data) =>
  prisma.businessShift.update({
    where: { id },
    data,
  });

export const softDeleteBusinessShift = (id, deletedBy) =>
  prisma.businessShift.update({
    where: { id },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy,
    },
  });
