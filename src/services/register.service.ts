import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { Shop } from "../models/shop.model";
import jwt from "jsonwebtoken";


const scryptAsync = promisify(scrypt);

export const RegisterService = {
  async createShop(userData: { shopName:string, ownerName: string, email: string, username: string; password: string; role: string }) {
    try{
      console.log("Creating shop with data:", userData);
      const existingUser = await Shop.findOne({ username: userData.username });
      if (existingUser) throw new Error("Shop already exists");
  
      const hashedPassword = await hashPassword(userData.password); // Hash password
      const newShop = new Shop({ ...userData, password: hashedPassword, activeScreen: 0 });
      await newShop.save();
  
      
      const shop = await Shop.findOne({ username: userData.username });
      if (!shop) throw new Error("Something went wrong! Try again later.");

       // Generate JWT token
          const token = jwt.sign(
            { id: shop.id, shopName: shop.shopName, email: shop.email, username: shop.username,ownerName: shop.ownerName },
            process.env.JWT_SECRET!,
            { expiresIn: "4d" }
          );
          shop.activeScreen += 1;
          await shop.save();
          console.log("RETURNING:: ", shop.ownerName);
      return { token, shop: { id: shop.id, shopName: shop.shopName, email: shop.email, username: shop.username, ownerName: shop.ownerName} };
    }
    catch(err){
      console.log("Error in creating shop", err);
    }
    
  },

  async validateUsername(username: string) {
    try {
      const existingUser = await Shop.findOne({ username });
      if (existingUser) return false;
      return true;
    } catch (error) {
      throw new Error("Error validating username: " + error);
    }
  },
};

// ✅ Function to Hash Password
async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

// ✅ Function to Compare Password
export async function comparePassword(storedHash: string, enteredPassword: string): Promise<boolean> {
  const [salt, key] = storedHash.split(":");
  const derivedKey = (await scryptAsync(enteredPassword, salt, 64)) as Buffer;
  return key === derivedKey.toString("hex");
}
