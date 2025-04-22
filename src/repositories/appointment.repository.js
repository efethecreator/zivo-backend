import prisma from "../../prisma/client.js"

export const createAppointment = (data) =>
  prisma.appointment.create({
    data: {
      customer: { connect: { id: data.customerId } },
      business: { connect: { id: data.businessId } },
      worker:   { connect: { id: data.workerId } },
      appointmentTime: data.appointmentTime,
      totalPrice:      data.totalPrice,
      status:          data.status,
    },
    include: {
      appointmentServices: {
        include: { service: true }
      }
    },
  })

export const createAppointmentServices = (entries) =>
  prisma.appointmentService.createMany({ data: entries })

export const getAppointmentsByCustomer = (customerId) =>
  prisma.appointment.findMany({
    where: { customerId, isDeleted: false },
    include: {
      business: true,
      worker: true,
      appointmentServices: { include: { service: true } },
    },
    orderBy: { appointmentTime: "desc" },
  })

export const getAppointmentById = (id) =>
  prisma.appointment.findUnique({
    where: { id },
    include: {
      business: true,
      worker: true,
      appointmentServices: { include: { service: true } },
    },
  })

export const softDeleteAppointment = (id, deletedBy) =>
  prisma.appointment.update({
    where: { id },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy,
    },
  })

export const getAppointmentsByBusinessId = (businessId) =>
  prisma.appointment.findMany({
    where: { businessId, isDeleted: false },
    include: {
      customer: true,
      worker: true,
      appointmentServices: { include: { service: true } },
    },
    orderBy: { appointmentTime: "desc" },
  })

export const updateAppointmentStatus = (id, status) =>
  prisma.appointment.update({
    where: { id },
    data: { status },
  })

export const assignWorkerToAppointment = (id, workerId) =>
  prisma.appointment.update({
    where: { id },
    data: { workerId },
  })
