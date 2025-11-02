import mongoose, { mongo } from "mongoose";

const friendshipSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  recipient: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

export const friendshipModel = mongoose.model("Friendship", friendshipSchema);
