import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
dotenv.config();
import router from "./routes/studentRoutes.js"
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);


const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

connectDb();

app.use("/api", router);

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log("Server started at", port)
})
