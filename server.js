import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan"; // For logging HTTP requests

dotenv.config();

// Import routes
import orderRoutes from "./routes/orders.js";
import itemRoutes from "./routes/items.js";

// Create an Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Log the MongoDB connection URI for debugging
console.log("Connecting to MongoDB at:", process.env.MONGODB_URI);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(morgan("dev")); // HTTP request logging

// Use routes
app.use("/api/orders", orderRoutes);
app.use("/api/items", itemRoutes); // Use the item routes
app.use("/uploads", express.static("uploads")); // Serve static files from the uploads folder

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the My Perfume Backend API!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack for debugging
  res.status(500).send("Something broke!"); // Send a generic error message
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
