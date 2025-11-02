import { commentModel } from "../models/commentModel.js";

// create comment
export const createCommentController = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    // validation
    if (!content) {
      return res.status(404).send({
        success: false,
        message: "Content is required to add a comment",
      });
    }

    // create comment
    const comment = new commentModel({
      content,
      post: postId,
      user: req.user.id,
    });

    // save comment
    await comment.save();

    res.status(201).send({
      success: true,
      message: "Comment added successfully!",
      comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create comment api",
      error: error.message,
    });
  }
};

// get comments for a post
export const getCommetsController = async (req, res) => {
  try {
    const { postId } = req.params;

    // fetch comments
    const comments = await commentModel
      .find({ post: postId })
      .populate("user", "username email");
    res.status(200).send({
      success: true,
      message: "Comment fetched successfully!",
      comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get comments api",
      error: error.message,
    });
  }
};

// update comment controller
export const updateCommentController = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    // validation
    if (!content) {
      return res.status(404).send({
        success: false,
        message: "Content is required to update a comment.",
      });
    }

    // find and update comment
    const updatedComment = await commentModel.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );

    // save comment
    await updatedComment.save();

    res.status(200).send({
      success: true,
      message: "Comment updated successfully!",
      updatedComment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update comments api",
      error: error.message,
    });
  }
};

// delete comment controller
export const deleteCommentController = async (req, res) => {
  try {
    const { commentId } = req.params;

    // find and delete comment
    await commentModel.findByIdAndDelete(commentId);

    res.status(200).send({
      success: true,
      message: "Comment deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update comments api",
      error: error.message,
    });
  }
};
