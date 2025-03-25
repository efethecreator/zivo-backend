import express from 'express';
import userRoutes from './routes/user.routes.js';
import { PORT } from "./config/config.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json()); 
app.use('/api/v1/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})