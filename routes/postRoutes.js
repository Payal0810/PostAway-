import express from "express";
import {
  createPostController,
  deletePostController,
  getAllPostsController,
  getPostByIdController,
  getUserPostsController,
  updatePostController,
} from "../controllers/postController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

export const postRouter = express.Router();

// routes

// get all posts
postRouter.get("/all", getAllPostsController);

// create post
postRouter.post("/", requireSignIn, createPostController);

// get post by id
postRouter.get("/:postId", getPostByIdController);

// get user posts
postRouter.get("/user/:userId", getUserPostsController);

// update post
postRouter.put("/:postId", updatePostController);

// delete post
postRouter.delete("/:postId", deletePostController);
