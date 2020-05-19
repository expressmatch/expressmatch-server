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

CommentSchema.methods.isCreatedByUser = function (user) {
    if (user) {
        return mongoose.Types.ObjectId(this.postedBy._id).equals(mongoose.Types.ObjectId(user._id));
    }
    return false;
};

CommentSchema.methods.isLikedByUser = function (user) {
    if(user){
        return this.likes.indexOf(user._id) >= 0;
    }
    return false;
};

CommentSchema.index({ "postedBy.city": 1, "profile.motherTongue": 1, "profile.caste": 1, "profile.subCaste": 1 });

module.exports = mongoose.model("Comment", CommentSchema);
