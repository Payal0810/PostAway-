import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// register controller
export const registerUserController = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // check for existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "User is already registered.",
      });
    }

    // hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      gender,
    });
    await newUser.save();
    res.status(201).send({
      success: true,
      message: "User registered suscessfully.",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration api",
      error: error.message,
    });
  }
};

// signin controller
export const signinUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(500).send({
        succes: false,
        message: "Please provide all required fields.",
      });
    }

    // check for user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        succes: false,
        message: "User not found.",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    // token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // store token
    user.tokens.push(token);
    await user.save();

    // success message
    res.status(200).send({
      success: true,
      message: "User logged in successfully!",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in signin api",
      error: error.message,
    });
  }
};

export const logoutUserController = async (req, res) => {
  try {
    // get current token
    const token = req.token;

    // find logged in user
    const user = await userModel.findById(req.user.id);

    // remove current token from current tokens list
    user.tokens = user.tokens.filter((t) => t !== token);

    // save the user
    await user.save();

    res.status(200).send({
      success: true,
      message: "User logged out successfully!",
    });
  } catch (error) {
    try {
      // get token from headers
      const token = req.headers.authorization.split(" ")[1];
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in logout api",
        error: error.message,
      });
    }
  }
};

// logout all devices
export const logOutAllController = async (req, res) => {
  try {
    const userId = req.user.id;

    // find user
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found.",
      });
    }

    // clear all tokens
    user.tokens = [];

    // save user
    await user.save();

    res.status(200).send({
      success: true,
      mssage: "Logged out of all devices successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in logout all devices api",
      error: error.message,
    });
  }
};
