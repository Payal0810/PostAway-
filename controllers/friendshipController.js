import { friendshipModel } from "../models/friendshipModel.js";

// get friends
export const getFriendsController = async (req, res) => {
  try {
    const userId = req.params.userId;

    const friends = await friendshipModel
      .find({
        $or: [
          { requester: userId, status: "accepted" },
          { recipient: userId, status: "accepted" },
        ],
      })
      .populate("requester", "userName email")
      .populate("recipient", "userName email");

    res.status(200).send({
      success: true,
      message: "Friends fetched successfully.",
      friends,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get user friends api",
      error: error.message,
    });
  }
};

// get pending request
export const getPendingRequestsController = async (req, res) => {
  try {
    const userId = req.user.id;

    const pendingRequests = await friendshipModel
      .find({ recipient: userId, status: "pending" })
      .populate("requester", "userName email");

    res.status(200).send({
      success: true,
      message: "Pending friend requests fetched successfully.",
      pendingRequests,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get pending requests api",
      error: error.message,
    });
  }
};

export const toggleFriendshipController = async (req, res) => {
  try {
    const userId = req.user.id;
    const friendId = req.params.friendId;

    let friendship = await friendshipModel.findOne({
      $or: [
        { requester: userId, recipient: friendId },
        { requester: friendId, recipient: userId },
      ],
    });

    if (!friendship) {
      // create a new pending request
      const newFriendship = new friendshipModel({
        requester: userId,
        recipient: friendId,
        status: "pending",
      });
      await newFriendship.save();
      return res.status(201).send({
        success: true,
        message: "Friend request sent.",
      });
    }

    // if pending and user is requester → cancel
    if (
      friendship.status === "pending" &&
      friendship.requester.toString() === userId
    ) {
      await friendshipModel.findByIdAndDelete(friendship._id);
      return res.status(200).send({
        success: true,
        message: "Friend request canceled.",
      });
    }

    // if accepted → unfriend
    if (friendship.status === "accepted") {
      await friendshipModel.findByIdAndDelete(friendship._id);
      return res.status(200).send({
        success: true,
        message: "Unfriended successfully.",
      });
    }

    res.status(400).send({
      success: false,
      message: "Invalid friendship action.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in toggle friendship api",
      error: error.message,
    });
  }
};

// respond to friend request
export const respondToFriendRequestController = async (req, res) => {
  try {
    const userId = req.user.id;
    const friendId = req.params.friendId;
    const { action } = req.body; // "accept" or "reject"

    const friendship = await friendshipModel.findOne({
      requester: friendId,
      recipient: userId,
      status: "pending",
    });

    if (!friendship) {
      return res.status(404).send({
        success: false,
        message: "No pending friend request found.",
      });
    }

    friendship.status = action === "accept" ? "accepted" : "rejected";
    await friendship.save();

    res.status(200).send({
      success: true,
      message:
        action === "accept"
          ? "Friend request accepted."
          : "Friend request rejected.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in respond to friend request api",
      error: error.message,
    });
  }
};
