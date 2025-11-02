import express from "express";
import {
  getFriendsController,
  getPendingRequestsController,
  respondToFriendRequestController,
  toggleFriendshipController,
} from "../controllers/friendshipController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

export const friendshipRouter = express.Router();

// get friends
friendshipRouter.get(
  "/get-friends/:userId",
  requireSignIn,
  getFriendsController
);

// get pending requests
friendshipRouter.get(
  "/get-pending-requests",
  requireSignIn,
  getPendingRequestsController
);

// toggle friendship
friendshipRouter.post(
  "/toggle-friendship/:friendId",
  requireSignIn,
  toggleFriendshipController
);

// respond to friend request
friendshipRouter.post(
  "/response-to-request/:friendId",
  requireSignIn,
  respondToFriendRequestController
);
