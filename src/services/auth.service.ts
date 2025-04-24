import { Shop } from "../models/shop.model";

export const AuthService = {
  async getUserById(userId: string) {
    return await Shop.findById(userId).select("-password"); // Exclude password field
  },

  async refreshToken(oldToken: string) {
    // Normally, you would verify the old token and issue a new one
    return oldToken; // Replace with actual token refresh logic
  },
};
