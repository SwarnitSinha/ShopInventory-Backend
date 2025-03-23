import { Request } from "express";

declare module "express" {
  export interface Request {
    user?: { id: string; role: string }; // Adjust fields as per your User model
  }
}
