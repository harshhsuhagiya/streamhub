import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body

    //TODO: create playlist
    if (!name || name.trim() === "") {
    throw new ApiError(400, "Playlist name is required");
}

const playlist = await Playlist.create({
    name,
    description,
    owner: req.user._id,
    videos: []
});

return res.status(201).json(
    new ApiResponse(201, playlist, "Playlist created successfully")
);
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    //TODO: get user playlists
    const playlists = await Playlist.find({ owner: userId }).sort({ createdAt: -1 });

return res.status(200).json(
    new ApiResponse(200, playlists, "User playlists fetched")
);
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id
    const playlist = await Playlist.findById(playlistId).populate("videos");

if (!playlist) {
    throw new ApiError(404, "Playlist not found");
}

return res.status(200).json(
    new ApiResponse(200, playlist, "Playlist fetched successfully")
);
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    const playlist = await Playlist.findById(playlistId);

if (!playlist) {
    throw new ApiError(404, "Playlist not found");
}

// avoid duplicate
if (playlist.videos.includes(videoId)) {
    throw new ApiError(400, "Video already in playlist");
}

playlist.videos.push(videoId);
await playlist.save();

return res.status(200).json(
    new ApiResponse(200, playlist, "Video added to playlist")
);
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist
    const playlist = await Playlist.findById(playlistId);

if (!playlist) {
    throw new ApiError(404, "Playlist not found");
}

playlist.videos = playlist.videos.filter(
    (vid) => vid.toString() !== videoId
);

await playlist.save();

return res.status(200).json(
    new ApiResponse(200, playlist, "Video removed from playlist")
);

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist
    const playlist = await Playlist.findByIdAndDelete(playlistId);

if (!playlist) {
    throw new ApiError(404, "Playlist not found");
}

return res.status(200).json(
    new ApiResponse(200, {}, "Playlist deleted successfully")
);
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    //TODO: update playlist
    const playlist = await Playlist.findById(playlistId);

if (!playlist) {
    throw new ApiError(404, "Playlist not found");
}

if (name) playlist.name = name;
if (description) playlist.description = description;

await playlist.save();

return res.status(200).json(
    new ApiResponse(200, playlist, "Playlist updated successfully")
);
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}