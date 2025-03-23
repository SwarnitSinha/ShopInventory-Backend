import { Request, Response } from "express";
import { buyerService } from "../services/buyer.service";

export const getBuyer = async (_req: Request, res: Response) => {
        const buyers = await buyerService.getAllBuyers();
        res.json(buyers);
};

export const createBuyer = async (req: Request, res: Response) => {
        const buyer = await buyerService.createBuyer(req.body);
        res.status(201).json(buyer);
};

export const updateBuyer = async (req: Request, res: Response) => {
        const { id } = req.params;
        const data = req.body;
        const buyer = await buyerService.updateBuyer(data,id);
        res.status(201).json(buyer);
};

export const deleteBuyer = async (req: Request, res: Response) => {
        // const data = req.body;
        const { id } = req.params;
        const buyer = await buyerService.deleteBuyer(id);
        res.status(201).json(buyer);
};
