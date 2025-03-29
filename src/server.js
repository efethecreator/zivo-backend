import express from 'express';
import authRoutes from './routes/auth.routes.js';
import { PORT, FRONTEND_URL } from "./config/config.js";
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

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})