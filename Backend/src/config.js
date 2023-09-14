import dotenv from 'dotenv';

dotenv.config();



export const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";

export const FRONTEND_URL = 'http://localhost:5173';