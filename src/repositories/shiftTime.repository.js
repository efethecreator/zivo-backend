import prisma from "../../prisma/client.js";

export const createShiftTime = (data) => prisma.shiftTime.create({ data });

export const getAllShiftTimes = () =>
  prisma.shiftTime.findMany({
    where: { isDeleted: false },
    orderBy: { startTime: "asc" },
  });

export const updateShiftTime = (id, data) =>
  prisma.shiftTime.update({
    where: { id },
    data,
  });



export const softDeleteShiftTime = (id, deletedBy) =>
  prisma.shiftTime.update({
    where: { id },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy,
    },
  });
