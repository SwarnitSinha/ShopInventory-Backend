import { Request, Response } from "express";

export const extractShopId = (req: Request, res: Response): string | null => {
  const shopId = req.user?.id; // Extract shopId from req.user
  if (!shopId) {
    res.status(401).json({ message: "Unauthorized: No shopId provided" });
    return null; // Return null if shopId is missing
  }
  return shopId;
};