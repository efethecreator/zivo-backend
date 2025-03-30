import express from 'express';
import authRoutes from './routes/auth.routes.js';
import { PORT, FRONTEND_URL } from "./config/config.js";
import testRoutes from "./routes/test.routes.js";
import roleRoutes from "./routes/role.middleware.routes.js";
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();

const app = express();

app.use(
    cors({
      origin: [FRONTEND_URL], 
      credentials: true,
    })
  );

app.use(express.json()); 
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use("/api/roles", roleRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})