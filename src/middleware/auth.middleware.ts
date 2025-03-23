import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


// Extend Express Request type (if not already done in types.d.ts)
declare module "express" {
  export interface Request {
    user?: { id: string; role: string };
  }
}

export const authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: string };
    req.user = decoded; // ✅ Assign user data to req.user
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
