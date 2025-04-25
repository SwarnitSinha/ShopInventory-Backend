import express from "express";
import { upload } from "../middleware/multer.middleware";
import { getProducts, createProduct, updateProduct, deleteProduct, searchProducts } from "../controllers/product.controller";
import { authenticateUser } from "../middleware/auth.middleware";

const router = express.Router();


router.get("/", authenticateUser, getProducts);
router.post("/",authenticateUser,upload.single("image"), createProduct);
router.patch("/:id",authenticateUser,upload.single("image"), updateProduct);
router.post("/delete/:id",authenticateUser,deleteProduct);
router.get("/search/",authenticateUser,searchProducts);
// router.post("/update/", updateProduct);

// POST - delete a product (instead of DELETE)
// router.delete("/:id", deleteProduct);

export default router;
