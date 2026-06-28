import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    // TODO: toggle subscription
    const userId = req.user._id;

// check existing subscription
const existingSub = await Subscription.findOne({
    channel: channelId,
    subscriber: userId
});

if (existingSub) {
    // unsubscribe
    await existingSub.deleteOne();
    return res.status(200).json(
        new ApiResponse(200, {}, "Unsubscribed successfully")
    );
}

// subscribe
await Subscription.create({
    channel: channelId,
    subscriber: userId
});

return res.status(200).json(
    new ApiResponse(200, {}, "Subscribed successfully")
);
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    const subscribers = await Subscription.find({
    channel: channelId
}).populate("subscriber", "username email");

return res.status(200).json(
    new ApiResponse(200, subscribers, "Subscribers fetched")
);
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
    const channels = await Subscription.find({
    subscriber: subscriberId
}).populate("channel", "username email");

return res.status(200).json(
    new ApiResponse(200, channels, "Subscribed channels fetched")
);
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}