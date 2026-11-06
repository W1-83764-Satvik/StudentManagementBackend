
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import router from "./routes/studentRoutes.js";
import dns from "node:dns";

dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

app.use(express.json());

const allowedOrigins = [
    "https://my-proj-n5z4yp4xd-satvik-283c.vercel.app",
    "https://my-proj-5pv10wnmm-satvik-283c.vercel.app",
    "https://my-proj-u1ohvmttn-satvik-283c.vercel.app",
    "https://my-proj-lilac.vercel.app",
    "http://localhost:5173"
];

app.use(cors({
    origin:allowedOrigins
}));

app.use(express.urlencoded({ extended: true }));

connectDb();

app.use("/api", router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server started at", port);
});
