import { User } from "../models/user.model";
import { comparePassword } from "./register.service"; // Import password compare function
import jwt from "jsonwebtoken";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export const LoginService = {
  async validateUser(credentials: { username: string; password: string }) {
    const user = await User.findOne({ username: credentials.username });
    console.log("user coming"+user);
    
    if (!user) throw new Error("Invalid username or password");

    // const hashedPassword  = await hashPassword(credentials.password);
    const isMatch = await comparePassword(user.password, credentials.password);
    if (!isMatch) throw new Error("Invalid username or password");

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "21h" }
    );

    return { token, user: { id: user.id, username: user.username, role: user.role } };
  },
};

// ✅ Function to Hash Password
async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}
