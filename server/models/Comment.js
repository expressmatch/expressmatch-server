"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
    content: {
        type: String
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

CommentSchema.methods.isLikedByUser = function (user) {
    // if(user){
    //     return this.likes.indexOf(user._id) >= 0;
    // }
    // return false;
};

module.exports = mongoose.model("Comment", CommentSchema);
