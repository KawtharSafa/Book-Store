import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT;
const localDBUsername = process.env.LOCAL_DB_USERNAME;
const password = process.env.PASSWORD;
const dbName = process.env.DB_NAME;
const appName = process.env.APP_NAME
const clusterName = process.env.CLUSTER_NAME;

const mongodbURL = `mongodb+srv://${localDBUsername}:${password}@${clusterName}.7vqibsb.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=${appName}`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongodbURL);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1);
  }
};

export { PORT, connectDB };
