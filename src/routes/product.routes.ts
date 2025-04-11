import express from "express";
import { upload } from "../middleware/multer.middleware";
import { getProducts, createProduct, updateProduct, deleteProduct, searchProducts } from "../controllers/product.controller";

const router = express.Router();


router.get("/", getProducts);
router.post("/",upload.single("image"), createProduct);
router.patch("/:id",upload.single("image"), updateProduct);
router.post("/delete/:id",deleteProduct);
router.get("/search/",searchProducts);
// router.post("/update/", updateProduct);

// POST - delete a product (instead of DELETE)
// router.delete("/:id", deleteProduct);

export default router;
