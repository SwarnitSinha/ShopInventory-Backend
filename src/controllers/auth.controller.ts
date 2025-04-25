import { Request, Response } from "express";
import { LoginService } from "../services/login.service";
import { RegisterService } from "../services/register.service";
import { AuthService } from "../services/auth.service";
import { OtpService } from "../services/otp.service";

export const userLogin = async (req: Request, res: Response) => {
  try {
    const response = await LoginService.validateUser(req.body);
    console.log("Login response:", response);
    res.status(200).json(response);
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials", error });
  }
};

export const shopRegister = async (req: Request, res: Response) => {
  try {
    const validateUsername = await RegisterService.validateUsername(req.body.username);
    if(validateUsername === false){
      res.status(400).json({ message: "Username already taken." });
      return;
    }
    const newUser = await RegisterService.createShop(req.body);
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
    console.log("Response from getCurrentUser:", user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("loggin req data ",req.headers.authorization);
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1]; // Extract the token after "Bearer"

    await LoginService.logout(token);
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

export const sendOtp = async (req: Request, res: Response)=>{
  try {
    const { phoneNumber } = req.body;
    const otp = await OtpService.sendOtp(phoneNumber);
    res.status(200).json({ message: "OTP sent successfully"});
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error });
  }
}

export const verifyOtp = async (req: Request, res: Response)=>{
  try {
    const { phoneNumber, otp } = req.body;
    const isCorrect = await OtpService.verifyOtp(phoneNumber,otp);
    if(!isCorrect){
      res.status(400).json({ message: "Invalid OTP"});
    }
    res.status(200).json({ message: "OTP verified successfully"});
  } catch (error) {
    res.status(500).json({ message: "ERROR IN OTP", error });
  }
}
