import {
  createAppointmentWithServices,
  getAppointmentsOfCustomer,
  getAppointmentDetails,
  deleteAppointmentService,
  getAppointmentsForBusiness,
  updateAppointmentStatusService,
  assignWorkerService,
  getRecentAppointmentsForBusiness,
  rescheduleAppointmentService,
  getAppointmentsForBusinessByDate 
} from "../services/appointment.service.js"

export const createAppointmentController = async (req, res) => {
  try {
    const { businessId, workerId, appointmentTime, services } = req.body

    const appointmentData = {
      customerId: req.user.profileId,
      businessId,
      workerId,
      appointmentTime: new Date(appointmentTime),
      status: "pending",
    }

    const created = await createAppointmentWithServices(appointmentData, services)
    res.status(201).json(created)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const getMyAppointmentsController = async (req, res) => {
  try {
    const list = await getAppointmentsOfCustomer(req.user.profileId)
    res.json(list)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getAppointmentByIdController = async (req, res) => {
  try {
    const appt = await getAppointmentDetails(req.params.id)
    if (!appt) return res.status(404).json({ message: "Randevu bulunamadı" })
    res.json(appt)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const deleteAppointmentController = async (req, res) => {
  try {
    await deleteAppointmentService(req.params.id, req.user.userId)
    res.json({ message: "Randevu soft silindi" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getAppointmentsByBusinessIdController = async (req, res) => {
  try {
    const list = await getAppointmentsForBusiness(req.params.businessId)
    res.json(list)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const updateAppointmentStatusController = async (req, res) => {
  try {
    const updated = await updateAppointmentStatusService(req.params.id, req.body.status)
    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const assignWorkerToAppointmentController = async (req, res) => {
  try {
    const updated = await assignWorkerService(req.params.id, req.body.workerId)
    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


export const getRecentAppointmentsController = async (req, res) => {
  try {
    const list = await getRecentAppointmentsForBusiness(req.params.businessId);
    res.json(list);
  } catch (err) {
    console.error("Recent Appointments Error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const rescheduleAppointmentController = async (req, res) => {
  try {
    const { appointmentTime } = req.body; // 👈 doğru key bu

    if (!appointmentTime || isNaN(Date.parse(appointmentTime))) {
      return res.status(400).json({ error: "Invalid or missing appointmentTime" });
    }

    const updated = await rescheduleAppointmentService(req.params.id, new Date(appointmentTime));
    res.json(updated);
  } catch (err) {
    console.error("Reschedule error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getAppointmentsByBusinessIdAndDateController = async (req, res) => {
  try {
    const { businessId, date } = req.params;
    const list = await getAppointmentsForBusinessByDate(businessId, date);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};