// application/repositories/appointment.repository.js

import prisma from "../../prisma/client.js";

export const createAppointment = (data) =>
  prisma.appointment.create({
    data: {
      customer: { connect: { id: data.customerId } },
      business: { connect: { id: data.businessId } },
      worker: { connect: { id: data.workerId } },
      appointmentTime: data.appointmentTime,
      totalPrice: data.totalPrice,
      status: data.status,
    },
    include: {
      appointmentServices: {
        include: { service: true },
      },
    },
  });

export const createAppointmentServices = (entries) =>
  prisma.appointmentService.createMany({ data: entries });

export const getAppointmentsByCustomer = (customerId) =>
  prisma.appointment.findMany({
    where: { customerId, isDeleted: false },
    include: {
      business: true,
      worker: true,
      review: true, 
      appointmentServices: { include: { service: true } },
    },
    orderBy: { appointmentTime: "desc" },
  });

export const getAppointmentById = (id) =>
  prisma.appointment.findUnique({
    where: { id },
    include: {
      business: true,
      worker: true,
      review: true, 
      appointmentServices: { include: { service: true } },
    },
  });

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
    where: { businessId, isDeleted: false },
    include: {
      customer: {
        include: {
          user: true,
        },
      },
      worker: true,
      review: true, 
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

export const getRecentAppointmentsByBusinessId = async (businessId) => {
  const appointments = await prisma.appointment.findMany({
    where: { businessId, isDeleted: false },
    include: {
      customer: true,
      appointmentServices: {
        include: {
          service: true,
        },
      },
    },
    orderBy: { appointmentTime: "desc" },
    take: 5, 
  });

  return appointments.map((appointment) => ({
    id: appointment.id,
    customerName: appointment.customer?.user?.fullName || "Müşteri", 
    customerPhoto: appointment.customer?.photoUrl || "", 
    services: appointment.appointmentServices
      .map((as) => as.service?.name)
      .join(", "), 
    appointmentDate: appointment.appointmentTime.toISOString().split("T")[0], 
    appointmentTime: appointment.appointmentTime
      .toISOString()
      .split("T")[1]
      .slice(0, 5), 
    status: appointment.status,
  }));
};

export const rescheduleAppointment = (id, newAppointmentTime) =>
  prisma.appointment.update({
    where: { id },
    data: {
      appointmentTime: new Date(newAppointmentTime),
      updatedAt: new Date(),
    },
  });

export const getAppointmentsByBusinessIdAndDate = async (businessId, date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return await prisma.appointment.findMany({
    where: {
      businessId,
      isDeleted: false,
      appointmentTime: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    select: {
      id: true,
      appointmentTime: true,
    },
    orderBy: { appointmentTime: "asc" },
  });
};
