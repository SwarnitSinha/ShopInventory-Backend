import express from "express";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.post("/delete/:id",deleteProduct);
// router.post("/update/", updateProduct);

// POST - delete a product (instead of DELETE)
// router.delete("/:id", deleteProduct);

export default router;
