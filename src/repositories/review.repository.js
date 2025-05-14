import prisma from "../../prisma/client.js";

export const findReviewByAppointmentId = (appointmentId) =>
  prisma.review.findUnique({
    where: { appointmentId },
  });

export const createReview = (data) => prisma.review.create({ data });

export const getReviewsByBusiness = (businessId) =>
  prisma.review.findMany({
    where: {
      isDeleted: false,
      appointment: {
        businessId,
        isDeleted: false,
      },
    },
    include: {
      appointment: {
        include: {
          customer: {
            include: {
              user: true, // 👈 işte asıl müşteri adını çekiyoruz!
            },
          },
          appointmentServices: {
            include: { service: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

export const getReviewsByCustomer = (customerId) =>
  prisma.review.findMany({
    where: {
      isDeleted: false,
      appointment: {
        customerId,
        isDeleted: false,
      },
    },
    include: {
      appointment: {
        include: {
          business: true,
          appointmentServices: {
            include: { service: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

export const updateReview = (id, data) =>
  prisma.review.update({
    where: { id },
    data,
  });

export const softDeleteReview = (id, deletedBy) =>
  prisma.review.update({
    where: { id },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy,
    },
  });
