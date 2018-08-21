"use strict";

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    // _id: {
    //
    // },
    content: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateLastModified: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    },
    anonymous: {
        type: Boolean,
        default: true
    },
    totalComments: {
        type: Number,
        default: 0
    },
    totalLikes: {
        type: Number,
        default: 0
    },
    totalShares: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String]
    }
});

module.exports = mongoose.model("Post", PostSchema);
