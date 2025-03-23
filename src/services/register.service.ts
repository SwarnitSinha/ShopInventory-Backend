import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { User } from "../models/user.model";

const scryptAsync = promisify(scrypt);

export const RegisterService = {
  async createUser(userData: { username: string; password: string; role: string }) {
    const existingUser = await User.findOne({ username: userData.username });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await hashPassword(userData.password); // Hash password
    const newUser = new User({ ...userData, password: hashedPassword });
    await newUser.save();

    return { id: newUser.id, username: newUser.username, role: newUser.role };
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
