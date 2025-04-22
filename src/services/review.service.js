import {
    findReviewByAppointmentId,
    createReview,
    getReviewsByBusiness,
    getReviewsByCustomer,
    updateReview,
    softDeleteReview,
  } from "../repositories/review.repository.js";
  
  import prisma from "../../prisma/client.js";
  
  export const createReviewService = async (user, { appointmentId, rating, comment }) => {
    const existing = await findReviewByAppointmentId(appointmentId);
    if (existing) throw new Error("Bu randevuya zaten yorum yapılmış.");
  
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });
  
    if (!appointment) throw new Error("Randevu bulunamadı.");
    if (appointment.customerId !== user.profileId)
      throw new Error("Bu randevu size ait değil.");
    if (!["confirmed", "completed"].includes(appointment.status))
      throw new Error("Yalnızca tamamlanmış veya onaylı randevulara yorum yapılabilir.");
  
    return await createReview({
      appointmentId,
      rating,
      comment,
    });
  };
  
  export const getBusinessReviewsService = async (businessId) =>
    await getReviewsByBusiness(businessId);
  
  export const getCustomerReviewsService = async (customerId) =>
    await getReviewsByCustomer(customerId);
  
  export const updateReviewService = async (id, data) =>
    await updateReview(id, data);
  
  export const deleteReviewService = async (id, deletedBy) =>
    await softDeleteReview(id, deletedBy);
  