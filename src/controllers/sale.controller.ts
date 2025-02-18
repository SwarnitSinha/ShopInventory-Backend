import { Request, Response } from "express";
import { SaleService } from "../services/sale.service";

export const getSales = async (_req: Request, res: Response) => {
        try {
                const sales = await SaleService.getAllSales();
                res.json(sales);
        } catch (error) {
                res.status(500).json({ message: "Error fetching sales", error });
        }
};

export const createSale = async (req: Request, res: Response) => {
        try {
                const sale = await SaleService.createSale(req.body);
                res.status(201).json(sale);
        } catch (error) {
                res.status(500).json({ message: "Error creating sale", error });
        }
};
