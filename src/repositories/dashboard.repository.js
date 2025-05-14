import prisma from "../../prisma/client.js";

// ✅ 1. Bugünkü randevu sayısı
export const getTodayAppointmentsCount = async (businessId) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return await prisma.appointment.count({
    where: {
      businessId,
      isDeleted: false,
      appointmentTime: {
        gte: start,
        lte: end,
      },
    },
  });
};

// ✅ 2. Bu haftaki randevu sayısı
export const getThisWeekAppointmentsCount = async (businessId) => {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay()); // Pazar = 0
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return await prisma.appointment.count({
    where: {
      businessId,
      isDeleted: false,
      appointmentTime: {
        gte: start,
        lte: end,
      },
    },
  });
};

// ✅ 3. Bu ayki toplam gelir
export const getMonthlyRevenueSum = async (businessId) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  const result = await prisma.appointment.aggregate({
    where: {
      businessId,
      isDeleted: false,
      appointmentTime: {
        gte: start,
        lte: end,
      },
    },
    _sum: {
      totalPrice: true,
    },
  });

  return result._sum.totalPrice || 0;
};

// ✅ 4. Yorum sayısı ve ortalama puan
export const getReviewStatsByBusiness = async (businessId) => {
  const result = await prisma.review.aggregate({
    where: {
      appointment: {
        businessId,
        isDeleted: false,
      },
      isDeleted: false,
    },
    _count: {
      id: true,
    },
    _avg: {
      rating: true,
    },
  });

  return {
    totalReviews: result._count.id || 0,
    averageRating: result._avg.rating
      ? parseFloat(result._avg.rating.toFixed(1))
      : 0,
  };
};
