import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

export const getProducts = async (_req: Request, res: Response) => {
        const products = await ProductService.getAllProducts();
        res.json(products);
};

export const createProduct = async (req: Request, res: Response) => {
        const product = await ProductService.createProduct(req.body);
        res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
        const { id } = req.params;
        const data = req.body;
        const product = await ProductService.updateProduct(data,id);
        res.status(201).json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
        // const data = req.body;
        const { id } = req.params;
        const product = await ProductService.deleteProduct(id);
        res.status(201).json(product);
};
