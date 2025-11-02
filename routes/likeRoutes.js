import express from "express";
import {
  getLikesController,
  toggleLikeController,
} from "../controllers/likeController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

export const likeRouter = express.Router();

// get likes for post
likeRouter.get("/:id", getLikesController);

// toggle likes
likeRouter.post("/toggle/:id", requireSignIn, toggleLikeController);
