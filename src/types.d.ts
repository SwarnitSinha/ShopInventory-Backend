import { Request } from "express";

declare module "express" {
  export interface Request {
    user?: { id: string; shopName: string; email: string; username: string; }; // Adjust fields as per your User model
  }
}
