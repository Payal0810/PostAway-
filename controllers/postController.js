import { postModel } from "../models/postModel.js";

// get all posts controller
export const getAllPostsController = async (req, res) => {
  try {
    // get all posts
    const posts = await postModel.find();

    res.status(200).send({
      success: true,
      message: "All posts fetched successfully!",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all posts api",
      error: error.message,
    });
  }
};

// create post controller
export const createPostController = async (req, res) => {
  try {
    // get data from req body
    const { caption, imageUrl } = req.body;

    // validation
    if (!caption || !imageUrl) {
      return res.status(400).send({
        success: false,
        message: "Caption and Image Url are required.",
      });
    }

    // create post
    const newPost = new postModel({
      caption,
      imageUrl,
      user: req.user.id,
    });

    // save the post
    await newPost.save();

    res.status(201).send({
      success: true,
      message: "Post created successfully!",
      newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create post api",
      error: error.message,
    });
  }
};

// get post by id controller
export const getPostByIdController = async (req, res) => {
  try {
    const { postId } = req.params;

    // find post
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post not found.",
      });
    }
    res.status(200).send({
      success: true,
      message: "Post fetched successfully!",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Error in get post by id api",
      error: error.message,
    });
  }
};

// get user posts controller
export const getUserPostsController = async (req, res) => {
  try {
    const { userId } = req.params;

    // find posts
    const posts = await postModel.find({ user: userId });
    if (!posts || posts.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No post found for this user.",
      });
    }
    res.status(200).send({
      success: true,
      message: "User posts fetched successfully!",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get user post api",
      error: error.message,
    });
  }
};

// update post router
export const updatePostController = async (req, res) => {
  try {
    const { postId } = req.params;
    const { caption, imageUrl } = req.body;

    // find post and update
    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      {
        caption,
        imageUrl,
      },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).send({
        success: false,
        message: "Post not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "post updated",
      updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update post api",
      error: error.message,
    });
  }
};

// delete post controller
export const deletePostController = async (req, res) => {
  try {
    const { postId } = req.params;

    // find post and delete
    await postModel.findByIdAndDelete(postId);

    res.status(200).send({
      success: true,
      message: "Post deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete post api",
      error: error.message,
    });
  }
};
