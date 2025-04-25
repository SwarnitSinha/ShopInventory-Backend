import express from "express";
import { getBuyer, createBuyer, updateBuyer, deleteBuyer } from "../controllers/buyer.controller";
import { authenticateUser } from "../middleware/auth.middleware";
const router = express.Router();

router.get("/",authenticateUser, getBuyer);
router.post("/",authenticateUser, createBuyer);
router.patch("/:id",authenticateUser, updateBuyer);
router.delete("/:id",authenticateUser, deleteBuyer);

export default router;
