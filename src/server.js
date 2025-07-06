import express from "express";
import { PORT, FRONTEND_URL } from "./config/config.js";
import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import roleRoutes from "./routes/role.middleware.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import userRoutes from "./routes/user.routes.js";
import businessRoutes from "./routes/business.routes.js";
import serviceRoutes from "./routes/services.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import businessWorkerRoutes from "./routes/businessWorker.routes.js";
import workerTypeRoutes from "./routes/workerType.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import favoriteRoutes from "./routes/favorites.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";
import businessContactRoutes from "./routes/businessContact.routes.js";
import shiftTimeRoutes from "./routes/shiftTime.routes.js";
import businessShiftRoutes from "./routes/businessShift.routes.js";
import exploreRoutes from "./routes/explore.routes.js";
import dahboardRoutes from "./routes/dashboard.routes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000", 
      "http://localhost:8081",
      "exp://192.168.1.42:8081", 
      "exp://localhost:8081",
      "exp://192.168.1.*:8081",
      "https://*.expo.io",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true, 
    maxAge: 86400, 
  })
);

app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/roles", roleRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/business", businessRoutes);
app.use("/api/v1/services", serviceRoutes);
app.use("/api/v1/appointments", appointmentRoutes);
app.use("/api/v1/business-workers", businessWorkerRoutes);
app.use("/api/v1/worker-types", workerTypeRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/favorites", favoriteRoutes);
app.use("/api/v1/portfolios", portfolioRoutes);
app.use("/api/v1/business-contacts", businessContactRoutes);
app.use("/api/v1/shift-times", shiftTimeRoutes);
app.use("/api/v1/business-shifts", businessShiftRoutes);
app.use("/api/v1/explore", exploreRoutes);
app.use("/api/v1/dashboard", dahboardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
