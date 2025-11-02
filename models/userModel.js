import mongoose from "mongoose";

// schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  tokens: [{ type: String }],
});

export const userModel = mongoose.model("User", userSchema);
