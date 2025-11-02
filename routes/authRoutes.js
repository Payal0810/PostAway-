import express from "express";
import {
  logOutAllController,
  logoutUserController,
  registerUserController,
  signinUserController,
} from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  getAllUserDetailsController,
  getUserDetailsController,
  updateUserDetailsController,
} from "../controllers/userController.js";

// router
const authRouter = express.Router();

// signup route
authRouter.post("/signup", registerUserController);

// signin route
authRouter.post("/signin", signinUserController);

// logout route
authRouter.post("/logout", requireSignIn, logoutUserController);

// logout all devices
authRouter.post("/logout-all-devices", requireSignIn, logOutAllController);

// get user details by id
authRouter.get("/get-details/:userId", getUserDetailsController);

// get all user details
authRouter.get("/get-all-details", getAllUserDetailsController);

// update user details
authRouter.put(
  "/update-details/:userId",
  requireSignIn,
  updateUserDetailsController
);

export default authRouter;
