import { userModel } from "../models/userModel.js";

// get user details by id controller
export const getUserDetailsController = async (req, res) => {
  try {
    const { userId } = req.params;

    // find user by id
    const user = await userModel.findById(userId).select("-password -tokens");

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "User details successfully fetched",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get user details api",
      error: error.message,
    });
  }
};

// get all user details controller
export const getAllUserDetailsController = async (req, res) => {
  try {
    // find all users
    const users = await userModel.find().select("-password -tokens");

    res.status(200).send({
      success: true,
      message: "All user details successfully fetched",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all users api",
      error: error.message,
    });
  }
};

// update user details controller
export const updateUserDetailsController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, gender } = req.body;

    // find user
    const user = await userModel.findById(userId);
    if (!user) {
      return es.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // update user details
    user.name = name || user.name;
    user.email = email || user.email;
    user.gender = gender || user.gender;

    // save user
    await user.save();

    const updatedUser = await userModel
      .findById(userId)
      .select("-password -tokens");

    res.status(200).send({
      success: true,
      message: "User details updated successfully!",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update user details api",
      error: error.message,
    });
  }
};
