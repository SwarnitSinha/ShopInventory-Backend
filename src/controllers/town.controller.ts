import { Request, Response } from "express";
import { TownService } from "../services/town.service";
import { extractShopId } from "../utils/extractDetailsFromReq";

export const getTown = async (_req: Request, res: Response) => {
        const shopId = extractShopId(_req, res);
        if(!shopId) return;
        const Towns = await TownService.getAllTowns(shopId);
        res.json(Towns);
};

export const createTown = async (req: Request, res: Response) => {
        const shopId = extractShopId(req, res);
        if(!shopId) return;
        req.body.shopId = shopId;
        const Town = await TownService.createTown(req.body);
        res.status(201).json(Town);
};

export const updateTown = async (req: Request, res: Response) => {
        const { id } = req.params;
        const data = req.body;
        data.shopId = extractShopId(req, res);
        const Town = await TownService.updateTown(data,id);
        res.status(201).json(Town);
};

export const deleteTown = async (req: Request, res: Response) => {
        // const data = req.body;
        const { id } = req.params;
        const Town = await TownService.deleteTown(id);
        res.status(201).json(Town);
};
