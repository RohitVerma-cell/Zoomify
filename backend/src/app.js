import express from "express";
import { createServer } from "node:http";
// import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import connectToSocket from "./controller/socketManager.js";
import userRoutes from "./routes/user.routes.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

const PORT = process.env.PORT || 8001; // ✅ Fix PORT issue

//  Correct MongoDB Connection (Use `.env` instead of hardcoding credentials)
const MONGO_URI = process.env.MONGO_URI
// || "mongodb://127.0.0.1:27017/apnaVideoCall";

const start = async () => {
    try {
        // ✅ Corrected MongoDB connection
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB Connected Successfully");

        // ✅ Start Server
        server.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Stop the server if DB connection fails
    }
};



app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));
app.use(express.json());

app.use("/api/v1/users", userRoutes); // ✅ Use user routes


start();


