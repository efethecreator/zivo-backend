import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const DATABASE_URL = process.env.DATABASE_URL;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const BACKEND_URL = process.env.BACKEND_URL;
