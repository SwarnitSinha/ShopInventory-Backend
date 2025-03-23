import { User } from "../models/user.model";

export const AuthService = {
  async getUserById(userId: string) {
    return await User.findById(userId).select("-password"); // Exclude password field
  },

  async logout(userId: any) {
    console.log(`User ${userId} logged out`); // Optional: Implement token revocation
  },

  async refreshToken(oldToken: string) {
    // Normally, you would verify the old token and issue a new one
    return oldToken; // Replace with actual token refresh logic
  },
};
