import {
  createAppointment,
  createAppointmentServices,
  getAppointmentsByCustomer,
  getAppointmentById,
  softDeleteAppointment,
  getAppointmentsByBusinessId,
  updateAppointmentStatus,
  assignWorkerToAppointment,
} from "../repositories/appointment.repository.js";

export const createAppointmentWithServices = async (
  appointmentData,
  services
) => {
  const appointment = await createAppointment(appointmentData);

  const serviceEntries = services.map((s) => ({
    appointmentId: appointment.id,
    serviceId: s.serviceId,
    priceAtBooking: s.price,
    durationAtBooking: s.duration,
  }));

  await createAppointmentServices(serviceEntries);
  return appointment;
};

export const getAppointmentsOfCustomer = async (customerId) => {
  return await getAppointmentsByCustomer(customerId);
};

export const getAppointmentDetails = async (id) => {
  return await getAppointmentById(id);
};

export const deleteAppointment = async (id, deletedBy) => {
  return await softDeleteAppointment(id, deletedBy);
};

export const getAppointmentsForBusiness = async (businessId) => {
  return await getAppointmentsByBusinessId(businessId);
};

export const updateAppointmentStatusService = async (id, status) => {
  return await updateAppointmentStatus(id, status);
};

export const assignWorkerService = async (id, workerId) => {
  return await assignWorkerToAppointment(id, workerId);
};
