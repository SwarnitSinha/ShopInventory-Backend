import { Shop } from "../models/shop.model";
import { comparePassword } from "./register.service"; // Import password compare function
import jwt from "jsonwebtoken";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export const LoginService = {
  async validateUser(credentials: { username: string; password: string }) {
    const shop = await Shop.findOne({ username: credentials.username });
    console.log("shop coming"+shop);
    
    if (!shop) throw new Error("Invalid username or password");

    // const hashedPassword  = await hashPassword(credentials.password);
    const isMatch = await comparePassword(shop.password, credentials.password);
    if (!isMatch) throw new Error("Invalid username or password");

    console.log("Data to be saved in JWT:", shop.id, shop.shopName, shop.email, shop.username);
    // Generate JWT token
    const token = jwt.sign(
      { id: shop.id, shopName: shop.shopName, email: shop.email, username: shop.username },
      process.env.JWT_SECRET!,
      { expiresIn: "4d" }
    );
    shop.activeScreen += 1;
    await shop.save();
    return { token, shop: { id: shop.id, shopName: shop.shopName, email: shop.email, username: shop.username, ownerName: shop.ownerName} };
  },

  async logout(token: string) {
    try {
      if (!token) {
        throw new Error('No token provided');
      }
  
      // Verify the token exists and get secret key
      const secretKey = process.env.JWT_SECRET;
      if (!secretKey) {
        throw new Error('JWT_SECRET is not configured');
      }
  
      // Verify and decode the token
      const decoded = jwt.verify(token, secretKey) as { id: string };
      const shopId = decoded.id;
  
      // Find and update the shop
      const shop = await Shop.findById(shopId);
      if (!shop) {
        throw new Error(`Shop not found with ID: ${shopId}`);
      }
  
      // Update active screen (ensure it doesn't go below 0)
      shop.activeScreen = Math.max(0, shop.activeScreen - 1);
      await shop.save();
  
      console.log(`Shop ${shopId} logged out successfully`);
      return { success: true, message: 'Logout successful' };
    } catch (error) {
      console.error('Logout failed:', error);
      
      // Handle specific JWT errors
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid token');
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token expired');
      }
  
      // Re-throw other errors
      throw error;
    }
  },
  
};

// ✅ Function to Hash Password
async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}
