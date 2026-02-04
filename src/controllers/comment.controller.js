import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query
    
    // 1️ validate videoId
  if (!videoId || !mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }

  // 2️ check video exists
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  // 3️ aggregation pipeline
  const aggregate = Comment.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(videoId)
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              fullname: 1,
              username: 1,
              avatar: 1
            }
          }
        ]
      }
    },
    {
      $addFields: {
        owner: { $first: "$owner" }
      }
    },
    {
      $sort: { createdAt: -1 }
    }
  ]);

  // 4️ pagination using plugin
  const comments = await Comment.aggregatePaginate(aggregate, {
    page: Number(page),
    limit: Number(limit)
  });

  // 5️ response
  return res.status(200).json(
    new ApiResponse(
      200,
      comments,
      "Video comments fetched successfully"
    )
  );
})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const { content } = req.body;
const { videoId } = req.params;

// 1️ Validate videoId
if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, "Invalid video ID");
}

// 2️ Check content exists
if (!content || content.trim() === "") {
    throw new ApiError(400, "Comment content is required");
}

// 3️ Check if video exists
const video = await Video.findById(videoId);
if (!video) {
    throw new ApiError(404, "Video not found");
}

// 4️ Create comment
const comment = await Comment.create({
    content,
    video: videoId,
    owner: req.user._id
});

// 5️ Send response
return res
    .status(201)
    .json(new ApiResponse(201, comment, "Comment added successfully"));

})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const { content } = req.body;
    const { commentId } = req.params;
    
    // 1️ Validate commentId
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new ApiError(400, "Invalid comment ID");
    }

    // 2️ Find and update comment
    const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { content },
        { new: true }
    );

    // 3️ Check if comment exists
    if (!updatedComment) {
        throw new ApiError(404, "Comment not found");
    }

    // 4️ Send response
    return res.status(200).json(
        new ApiResponse(200, updatedComment, "Comment updated successfully")
    );
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const { commentId } = req.params;

    // 1 ️ Validate commentId
    if(!mongoose.Types.ObjectId.isValid(commentId)) {
       throw new ApiError(400, "Invalid comment ID");
    }

    // 2️ Find and delete comment
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    // 3️ Check if comment exists
    if(!deletedComment) {
       throw new ApiError(404, "Comment not found");
    }

    // 4️ Send response
    return res.status(200).json(
       new ApiResponse(200, deletedComment, "Comment deleted successfully")
    );
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }