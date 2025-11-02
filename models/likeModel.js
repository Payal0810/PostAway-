import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
  comment: {
    type: mongoose.Types.ObjectId,
    ref: "Comment",
  },
});

export const likeModel = mongoose.model("Like", likesSchema);
