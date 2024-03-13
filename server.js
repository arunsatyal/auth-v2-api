import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectToMongoDb } from "./config/dbConfig.js";

import userRoutes from "./routes/userRouter";
import authRoutes from "./routes/auth";

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8000;

//Call function to connect DB from dbConfig.js
connectToMongoDb();

//Running the server
app.listen(PORT, (error) => {
  error
    ? console.log("Error: ", error)
    : console.log("Server is running at PORT " + PORT);
});
