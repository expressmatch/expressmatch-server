"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    content: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    anonymous: {
        type: Boolean,
        default: true
    },
    comments: {
        type: [String]
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    shares: {
        type: [String]
    },
    tags: {
        type: [String]
    }
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);
