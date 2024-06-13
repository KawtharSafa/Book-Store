import express from "express";
import { PORT, connectDB } from "./config.js";
import cors from "cors";
import booksRoute from "./routes/books.js";
import cartsRoute from "./routes/carts.js";
import ordersRoute from "./routes/orders.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors());

//home page of FE side
app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome to MERN Stack Bookstore");
});

//main route call
app.use("/api/books", booksRoute);
app.use("/api/carts/", cartsRoute);
app.use("/api/orders", ordersRoute);

//starting db server
const startServer = async () => {
  await connectDB(); // Connect to the database
  app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
  });
};

startServer();
