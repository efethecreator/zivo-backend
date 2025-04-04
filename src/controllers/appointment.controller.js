import {
  createAppointmentWithServices,
  getAppointmentsOfCustomer,
  getAppointmentDetails,
  deleteAppointment,
  getAppointmentsForBusiness,
  updateAppointmentStatusService,
  assignWorkerService,
} from "../services/appointment.service.js";

export const createAppointmentController = async (req, res) => {
  try {
    const { businessId, workerId, appointmentTime, services, totalPrice } =
      req.body;

    const appointmentData = {
      customerId: req.user.profileId,
      businessId,
      workerId,
      appointmentTime: new Date(appointmentTime),
      totalPrice,
      status: "pending",
    };

    const created = await createAppointmentWithServices(
      appointmentData,
      services
    );
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyAppointmentsController = async (req, res) => {
  try {
    const appointments = await getAppointmentsOfCustomer(req.user.profileId);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAppointmentByIdController = async (req, res) => {
  try {
    const appointment = await getAppointmentDetails(req.params.id);
    if (!appointment)
      return res.status(404).json({ message: "Randevu bulunamadı" });
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAppointmentController = async (req, res) => {
  try {
    await deleteAppointment(req.params.id, req.user.userId);
    res.json({ message: "Randevu soft silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAppointmentsByBusinessIdController = async (req, res) => {
  try {
    const appointments = await getAppointmentsForBusiness(
      req.params.businessId
    );
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAppointmentStatusController = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await updateAppointmentStatusService(req.params.id, status);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const assignWorkerToAppointmentController = async (req, res) => {
  try {
    const { workerId } = req.body;
    const updated = await assignWorkerService(req.params.id, workerId);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
