import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import productRoutes from "./routes/product.routes.js";
import paymentsRoutes from "./routes/payments.routes.js";
import orderRoutes from "./routes/orders.routes.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS in development
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );
}

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/orders", orderRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendBuildPath = path.join(__dirname, "../frontend/build");

  // Serve static files
  app.use(express.static(frontendBuildPath));

  // Catch-all route for React Router
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(frontendBuildPath, "index.html"));
  });
}

// Connect to DB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
  });
