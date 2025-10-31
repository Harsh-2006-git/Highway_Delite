import * as dotenv from "dotenv";
import express, { json, response } from "express";
import { connectDB, sequelize } from "./config/database.js";
import errorHandler from "./middlewares/errorHandler.js";

import ExperiencesRoutes from "./routes/listingRoutes.js";
import PromocodeRoutes from "./routes/promoRoutes.js";

import helmet from "helmet";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration - FIX 1: Specify exact origins
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:5500",
      "http://localhost:5173",
      "https://alumni-mits.vercel.app",
    ], // Add your frontend URLs
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "Origin",
      "X-Requested-With",
    ],
  })
);

// Middleware - FIX 2: Correct order
app.use(json());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Move this up before routes
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }, // FIX 3: Allow cross-origin resources
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/experiences", ExperiencesRoutes);
app.use("/promo", PromocodeRoutes);

// Error handling middleware (should be last)
app.use(errorHandler);

// Clean server startup
const startServer = async () => {
  try {
    console.log("🔄 Starting server...");

    // Connect to database
    await connectDB();
    //await seed();

    // Sync database
    await sequelize.sync({ alter: true });
    //await sequelize.sync({ force: true });

    // Start server
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
