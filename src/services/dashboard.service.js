import {
    getTodayAppointmentsCount,
    getThisWeekAppointmentsCount,
    getMonthlyRevenueSum,
    getReviewStatsByBusiness
  } from "../repositories/dashboard.repository.js";
  
  export const getBusinessDashboardData = async (businessId) => {
    const todayAppointments = await getTodayAppointmentsCount(businessId);
    const thisWeekAppointments = await getThisWeekAppointmentsCount(businessId);
    const monthlyRevenue = await getMonthlyRevenueSum(businessId);
    const { totalReviews, averageRating } = await getReviewStatsByBusiness(businessId);
  
    return {
      todayAppointments,
      thisWeekAppointments,
      monthlyRevenue,
      totalReviews,
      averageRating
    };
  };
  