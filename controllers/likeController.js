import { likeModel } from "../models/likeModel.js";

// get likes for a post
export const getLikesController = async (req, res) => {
  try {
    const postId = req.params.id;
    const likes = await likeModel
      .find({ post: postId })
      .populate("user", "name email");

    res.status(200).send({
      success: true,
      totalLikes: likes.length,
      likes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get likes api",
      error: error.message,
    });
  }
};

// toggle likes
export const toggleLikeController = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    // check if like already exists
    const existingLike = await likeModel.findOne({
      post: postId,
      user: userId,
    });

    if (existingLike) {
      await likeModel.findByIdAndDelete(existingLike.id);
      return res.status(200).send({
        success: true,
        message: "Like removed",
      });
    } else {
      const newLike = new likeModel({ post: postId, user: userId });
      await newLike.save();
      return res.status(201).send({
        success: true,
        message: "Post liked",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get likes api",
      error: error.message,
    });
  }
};
