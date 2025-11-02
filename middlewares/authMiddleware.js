import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    // get the token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user with matching token in DB
    const user = await userModel.findOne({ _id: decoded.id, tokens: token });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    // attach user info to request
    req.user = { id: user.id, email: user.email };
    req.token = token;

    // continue to controller or next middleware
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "unauthorized user",
    });
  }
};
