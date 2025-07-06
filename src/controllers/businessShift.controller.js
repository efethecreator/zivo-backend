import {
  addBusinessShiftService,
  getShiftsService,
  updateShiftService,
  deleteShiftService,
} from "../services/businessShift.service.js";

export const createBusinessShiftController = async (req, res) => {
  try {
    const { businessId, dayOfWeek, shiftTimeId } = req.body;
    const created = await addBusinessShiftService({
      businessId,
      dayOfWeek,
      shiftTimeId,
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getShiftsByBusinessController = async (req, res) => {
  try {
    const list = await getShiftsService(req.params.businessId);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBusinessShiftController = async (req, res) => {
  try {
    const { businessId, dayOfWeek, shiftTimeId, isActive } = req.body;

    const updated = await updateShiftService(req.params.id, {
      businessId,
      dayOfWeek,
      shiftTimeId,
      ...(isActive !== undefined && { isActive }), 
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBusinessShiftController = async (req, res) => {
  try {
    await deleteShiftService(req.params.id, req.user.userId);
    res.json({ message: "Çalışma saati silindi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
