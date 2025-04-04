import prisma from "../../prisma/client.js";

export const createAppointment = (data) =>
  prisma.appointment.create({
    data,
    include: { appointmentServices: true },
  });

export const createAppointmentServices = (data) =>
  prisma.appointmentService.createMany({ data });

export const getAppointmentsByCustomer = (customerId) =>
  prisma.appointment.findMany({
    where: { customerId, isDeleted: false },
    include: {
      business: true,
      appointmentServices: {
        include: { service: true }
      },
    },
    orderBy: { appointmentTime: "desc" },
  });

export const getAppointmentById = (id) =>
  prisma.appointment.findUnique({
    where: { id },
    include: {
      appointmentServices: { include: { service: true } },
      business: true,
    },
  }).then((appt) => (appt?.isDeleted ? null : appt));

export const softDeleteAppointment = (id, deletedBy) =>
  prisma.appointment.update({
    where: { id },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy,
    },
  });

  export const getAppointmentsByBusinessId = (businessId) =>
    prisma.appointment.findMany({
      where: {
        businessId,
        isDeleted: false,
      },
      include: {
        customer: true,
        worker: true,
        appointmentServices: {
          include: { service: true },
        },
      },
      orderBy: { appointmentTime: "desc" },
    });
  
  export const updateAppointmentStatus = (id, status) =>
    prisma.appointment.update({
      where: { id },
      data: { status },
    });
  
  export const assignWorkerToAppointment = (id, workerId) =>
    prisma.appointment.update({
      where: { id },
      data: { workerId },
    });