import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
   const userId = req.user._id;

// 1 Total videos
const totalVideos = await Video.countDocuments({ owner: userId });

// 2 Total views
const viewsResult = await Video.aggregate([
    { $match: { owner: userId } },
    {
        $group: {
            _id: null,
            totalViews: { $sum: "$views" }
        }
    }
]);

const totalViews = viewsResult[0]?.totalViews || 0;

// 3 Total subscribers
const totalSubscribers = await Subscription.countDocuments({
    channel: userId
});

//  4 Total likes (on all videos)
const likesResult = await Like.aggregate([
    {
        $lookup: {
            from: "videos",
            localField: "video",
            foreignField: "_id",
            as: "videoData"
        }
    },
    { $unwind: "$videoData" },
    { $match: { "videoData.owner": userId } },
    {
        $group: {
            _id: null,
            totalLikes: { $sum: 1 }
        }
    }
]);

const totalLikes = likesResult[0]?.totalLikes || 0;

// 5 Response
return res.status(200).json(
    new ApiResponse(200, {
        totalVideos,
        totalViews,
        totalSubscribers,
        totalLikes
    }, "Channel stats fetched successfully")
);
    
})

const getChannelVideos = asyncHandler(async (req, res) => {
    const userId = req.user._id;

// 1 Get all videos of this channel
const videos = await Video.find({ owner: userId })
    .sort({ createdAt: -1 });

// 2  Check if no videos
if (!videos || videos.length === 0) {
    throw new ApiError(404, "No videos found");
}

// 3 Send response
return res.status(200).json(
    new ApiResponse(200, videos, "Channel videos fetched successfully")
);
})

export {
    getChannelStats, 
    getChannelVideos
    }