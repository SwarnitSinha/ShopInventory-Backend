import { Request, Response } from "express";
import { LoginService } from "../services/login.service";
import { RegisterService } from "../services/register.service";
import { AuthService } from "../services/auth.service";

export const userLogin = async (req: Request, res: Response) => {
  try {
    const response = await LoginService.validateUser(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials", error });
  }
};

export const userRegister = async (req: Request, res: Response) => {
  try {
    const newUser = await RegisterService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: "Registration failed", error });
  }
};

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await AuthService.getUserById(req.user?.id);
    if(!user){
      res.status(404).json({ message: "User not found" });
      return;
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    
    // if (!req.user || !req.user.id) {
    //   res.status(401).json({ message: "Unauthorized" });
    //   return;
    // }

    await AuthService.logout(req.user?.id);
    res.status(200).json({ message: "Logged out successfully" });
    
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const newToken = await AuthService.refreshToken(req.body.token);
    res.json({ token: newToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token", error });
  }
};
