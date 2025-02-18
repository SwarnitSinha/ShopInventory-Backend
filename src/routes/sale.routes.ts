import express from "express";
import { getSales, createSale } from "../controllers/sale.controller";

const router = express.Router();

// Get all sales
router.get("/", getSales);

// Create a new sale
router.post("/", createSale);

export default router;
