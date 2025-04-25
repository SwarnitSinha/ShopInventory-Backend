import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


// Extend Express Request type (if not already done in types.d.ts)
declare module "express" {
  export interface Request {
    user?: {
      id: string;
      shopName: string;
      email: string;
      username: string;
    };
  }
}

export const authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
// Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      shopName: string;
      email: string;
      username: string;
    };
    req.user = decoded; // ✅ Assign user data to req.user
    console.log(req.user.shopName);
    console.log(req.user.email);
    console.log(req.user.username);
    console.log(req.user.id);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
