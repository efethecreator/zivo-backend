import {
  createAppointment,
  createAppointmentServices,
  getAppointmentsByCustomer,
  getAppointmentById,
  softDeleteAppointment,
  getAppointmentsByBusinessId,
  updateAppointmentStatus,
  assignWorkerToAppointment,
} from "../repositories/appointment.repository.js"

export const createAppointmentWithServices = async (appointmentData, services) => {
  const totalPrice = services.reduce((sum, s) => sum + s.price, 0)

  const appointment = await createAppointment({
    ...appointmentData,
    totalPrice,
  })

  const entries = services.map((s) => ({
    appointmentId: appointment.id,
    serviceId: s.serviceId,
    priceAtBooking: s.price,
    durationAtBooking: s.duration,
  }))

  await createAppointmentServices(entries)

  return appointment
}

export const getAppointmentsOfCustomer = async (customerId) =>
  await getAppointmentsByCustomer(customerId)

export const getAppointmentDetails = async (id) => {
  const appt = await getAppointmentById(id)
  if (!appt || appt.isDeleted) return null
  return appt
}

export const deleteAppointmentService = async (id, deletedBy) =>
  await softDeleteAppointment(id, deletedBy)

export const getAppointmentsForBusiness = async (businessId) =>
  await getAppointmentsByBusinessId(businessId)

export const updateAppointmentStatusService = async (id, status) =>
  await updateAppointmentStatus(id, status)

export const assignWorkerService = async (id, workerId) =>
  await assignWorkerToAppointment(id, workerId)
