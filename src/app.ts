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

// ✅ Correct way to enable CORS
app.use(cors({
    origin: "http://localhost:3000", // Allow frontend
    credentials: true, // Allow cookies & auth headers
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/buyers", buyerRoutes);
app.use("/api/towns", townRoutes);
// Serve the uploads directory as static files
app.use("/uploads", express.static(path.join("C:/DISK SWARNIT/Shop Inventory/uploads")));


export default app;
