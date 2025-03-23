import express from "express";
import { getBuyer, createBuyer, updateBuyer, deleteBuyer } from "../controllers/buyer.controller";

const router = express.Router();

router.get("/", getBuyer);
router.post("/", createBuyer);
router.patch("/:id", updateBuyer);
router.delete("/:id",deleteBuyer);

export default router;
