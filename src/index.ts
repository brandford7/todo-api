import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./db";
import todoRoutes from "./routes/todos";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

// Error handling (must be last middleware)
app.use(errorHandler);

// Database connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
