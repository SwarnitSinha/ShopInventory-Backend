import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import saleRoutes from "./routes/sale.routes";
import buyerRoutes from "./routes/buyer.routes";
import townRoutes from "./routes/town.routes";
import path from "path";

dotenv.config();
connectDB();

const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_ORIGIN,
  process.env.FRONTEND_ORIGIN_2,
].filter(Boolean);
// ✅ Correct way to enable CORS
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
    credentials: true, // Allow cookies & auth headers
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use((req, res, next) => {
    console.log('Full URL:', `${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/buyers", buyerRoutes);
app.use("/api/towns", townRoutes);
// Serve the uploads directory as static files
app.use("/uploads", express.static(path.join("C:/DISK SWARNIT/Shop Inventory/uploads")));


export default app;
