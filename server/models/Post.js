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
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    // shares: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // }],
    tags: {
        type: [String]
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    // postedBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    postedBy: {
        userId: Schema.Types.ObjectId,
        caste: String,
        subCaste: String,
        city: String,
        motherTongue: String
    },
    spam: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {timestamps: true});

PostSchema.methods.isCreatedByUser = function (user) {
    if (user) {
        return mongoose.Types.ObjectId(this.postedBy.userId).equals(mongoose.Types.ObjectId(user._id));
    }
    return false;
};

PostSchema.methods.isLikedByUser = function (user) {
    if (user) {
        return this.likes.indexOf(user._id) >= 0;
    }
    return false;
};

module.exports = mongoose.model("Post", PostSchema);
