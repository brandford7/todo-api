import mongoose from "mongoose";
import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI as string;

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(
      "Connection error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    process.exit(1);
  }
};

export default connectDB;
