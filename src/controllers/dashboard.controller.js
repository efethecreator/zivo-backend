import { getBusinessDashboardData } from "../services/dashboard.service.js";

export const getBusinessDashboardController = async (req, res) => {
  try {
    const dashboard = await getBusinessDashboardData(req.params.businessId);
    res.json(dashboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
