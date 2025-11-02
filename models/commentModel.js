import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: ["true", "Content is required"],
      trim: true,
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const commentModel = mongoose.model("Comment", commentSchema);
