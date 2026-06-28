import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    const userId = req.user._id;

// check existing like
const existingLike = await Like.findOne({
    video: videoId,
    likedBy: userId
});

if (existingLike) {
    // unlike
    await existingLike.deleteOne();
    return res.status(200).json(
        new ApiResponse(200, {}, "Video unliked")
    );
}

// like
await Like.create({
    video: videoId,
    likedBy: userId
});

return res.status(200).json(
    new ApiResponse(200, {}, "Video liked")
);
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment
    const userId = req.user._id;

const existingLike = await Like.findOne({
    comment: commentId,
    likedBy: userId
});

if (existingLike) {
    await existingLike.deleteOne();
    return res.status(200).json(
        new ApiResponse(200, {}, "Comment unliked")
    );
}

await Like.create({
    comment: commentId,
    likedBy: userId
});

return res.status(200).json(
    new ApiResponse(200, {}, "Comment liked")
);

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
    const userId = req.user._id;

const existingLike = await Like.findOne({
    tweet: tweetId,
    likedBy: userId
});

if (existingLike) {
    await existingLike.deleteOne();
    return res.status(200).json(
        new ApiResponse(200, {}, "Tweet unliked")
    );
}

await Like.create({
    tweet: tweetId,
    likedBy: userId
});

return res.status(200).json(
    new ApiResponse(200, {}, "Tweet liked")
);
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    const userId = req.user._id;

const likedVideos = await Like.find({
    likedBy: userId,
    video: { $exists: true }
}).populate("video");

// optional empty check
if (!likedVideos || likedVideos.length === 0) {
    return res.status(200).json(
        new ApiResponse(200, [], "No liked videos")
    );
}

return res.status(200).json(
    new ApiResponse(200, likedVideos, "Liked videos fetched")
);
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}