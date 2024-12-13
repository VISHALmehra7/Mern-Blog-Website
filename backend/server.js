import express from "express";
import dotenv from "dotenv";
import connectToDb from "./db/connectToDb.js";
import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import path from 'path'


dotenv.config();


const app = express();
app.use(express.json());
app.use(cookieParser());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth',authRoutes)
app.use('/api/post',postRoutes)
app.use('/api/admin',adminRoutes)

app.get("/", (req, res) => {
  res.send("Hello world!!");
});



app.listen(3000, () => {
  console.log("Server is running on port 3000");
  connectToDb();
});
