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
      review: true, // 👈 yorum eklendi
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
      review: true, // 👈 yorum eklendi
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
      review: true, // 👈 yorum eklendi
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
    take: 5, // Son 5 randevu
  });

  return appointments.map((appointment) => ({
    id: appointment.id,
    customerName: appointment.customer?.user?.fullName || "Müşteri", // Eğer bağlı User var ise
    customerPhoto: appointment.customer?.photoUrl || "", // Profil fotoğrafı
    services: appointment.appointmentServices
      .map((as) => as.service?.name)
      .join(", "), // Birden fazla service olabilir
    appointmentDate: appointment.appointmentTime.toISOString().split("T")[0], // YYYY-MM-DD
    appointmentTime: appointment.appointmentTime
      .toISOString()
      .split("T")[1]
      .slice(0, 5), // HH:MM
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
