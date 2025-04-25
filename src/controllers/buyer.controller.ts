import { Request, Response } from "express";
import { buyerService } from "../services/buyer.service";
import { extractShopId } from "../utils/extractDetailsFromReq";

export const getBuyer = async (req: Request, res: Response) => {
        const shopId = extractShopId(req, res);
        if (!shopId) return;
        const buyers = await buyerService.getAllBuyers(shopId);
        res.json(buyers);
};

export const createBuyer = async (req: Request, res: Response) => {
        const shopId = extractShopId(req, res);
        if (!shopId) return;
        const buyer = await buyerService.createBuyer(req.body, shopId);
        res.status(201).json(buyer);
};

export const updateBuyer = async (req: Request, res: Response) => {
        const shopId = extractShopId(req, res);
        if (!shopId) return;
        const { id } = req.params;
        const data = req.body;
        const buyer = await buyerService.updateBuyer(data,id,shopId);
        res.status(201).json(buyer);
};

export const deleteBuyer = async (req: Request, res: Response) => {
        // const data = req.body;
        const shopId = extractShopId(req, res);
        if (!shopId) return;
        const { id } = req.params;
        const buyer = await buyerService.deleteBuyer(id, shopId);
        res.status(201).json(buyer);
};
