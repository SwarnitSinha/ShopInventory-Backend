import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
        username: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["admin", "staff", "technician"], required: true },
});

export const User = mongoose.model("User", UserSchema);
