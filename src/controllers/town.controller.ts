import { Request, Response } from "express";
import { TownService } from "../services/town.service";

export const getTown = async (_req: Request, res: Response) => {
        const Towns = await TownService.getAllTowns();
        res.json(Towns);
};

export const createTown = async (req: Request, res: Response) => {
        const Town = await TownService.createTown(req.body);
        res.status(201).json(Town);
};

export const updateTown = async (req: Request, res: Response) => {
        const { id } = req.params;
        const data = req.body;
        const Town = await TownService.updateTown(data,id);
        res.status(201).json(Town);
};

export const deleteTown = async (req: Request, res: Response) => {
        // const data = req.body;
        const { id } = req.params;
        const Town = await TownService.deleteTown(id);
        res.status(201).json(Town);
};
