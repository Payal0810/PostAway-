import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createCommentController,
  deleteCommentController,
  getCommetsController,
  updateCommentController,
} from "../controllers/commentController.js";

export const commentRouter = express.Router();

// routes

// create comment
commentRouter.post("/:postId", requireSignIn, createCommentController);

// get comment for post
commentRouter.get("/:postId", getCommetsController);

// update comment
commentRouter.put("/:commentId", updateCommentController);

// delete comment
commentRouter.delete("/:commentId", requireSignIn, deleteCommentController);
