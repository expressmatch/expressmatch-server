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
    shares: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    tags: {
        type: [String]
    },
    // postedBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    postedBy: {
        userId: Schema.Types.ObjectId,
        caste: String,
        subCaste: String,
        city: String
    },
}, { timestamps: true });

PostSchema.methods.isLikedByUser = function(user){
   if(user){
       return this.likes.indexOf(user._id) >= 0;
   }
   return false;
};

module.exports = mongoose.model("Post", PostSchema);
