import mongoose from "mongoose";

export const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: ["true", "Caption is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: ["true", "Image URL is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: ["true", "User is required"],
    },
  },
  { timestamps: true }
);

export const postModel = mongoose.model("Post", postSchema);
