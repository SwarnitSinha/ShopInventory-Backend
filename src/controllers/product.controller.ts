import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

export const getProducts = async (_req: Request, res: Response) => {
    try {
        const products = await ProductService.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error("Error in getProducts:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, quantity, purchasePrice, regularPrice, bulkPrice } = req.body;

        // Handle the uploaded file
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

        const productData = {
            name,
            description,
            quantity: Number(quantity),
            purchasePrice: Number(purchasePrice),
            regularPrice: Number(regularPrice),
            bulkPrice: Number(bulkPrice),
            imageUrl,
        };

        const product = await ProductService.createProduct(productData);
        res.status(201).json(product);
    } catch (error) {
        console.error("Error in createProduct:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, quantity, purchasePrice, regularPrice, bulkPrice } = req.body;

        // Handle the uploaded file
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

        const productData = {
            name,
            description,
            quantity: Number(quantity),
            purchasePrice: Number(purchasePrice),
            regularPrice: Number(regularPrice),
            bulkPrice: Number(bulkPrice),
            imageUrl,
        };

        const updatedProduct = await ProductService.updateProduct(productData, id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error in updateProduct:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await ProductService.deleteProduct(id);
        res.status(200).json(product);
    } catch (error) {
        console.error("Error in deleteProduct:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const searchProducts = async (req: Request, res: Response) => {
    try {
        const { query } = req.query;

        if (!query || typeof query !== "string") {
            res.status(400).json({ message: "Query parameter is required and must be a string." });
            return;
        }

        const products = await ProductService.searchProductsByName(query);
        res.status(200).json(products);
    } catch (error) {
        console.error("Error in searchProducts:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};