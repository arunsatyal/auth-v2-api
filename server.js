import express from "express";
import cors from "cors";
import connectToMongoDb from "./config/dbConfig.js";
import router from "./routes/authRoute.js";

const app = express();

const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Route
app.use("/api/auth", router);

// Mongo DB Connection
connectToMongoDb();

// Global Error Handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// Server Start
app.listen(PORT, () => {
  console.log("Server is running at PORT:", PORT);
});
