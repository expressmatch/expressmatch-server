const express = require("express");
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');

module.exports = function (app) {

    app.get('/api/post/:postId/comment/', getPostComments);
    app.post('/api/comment', postComment);
    app.post('/api/comment/like', likeComment);

    return router;
};

const getPostComments = function (req, res, next) {

};

const postComment = function (req, res, next) {
    let postId = req.body.postId,
        commentId = req.body.commentId,
        commentStr = req.body.comment;

    if(!!commentId){

        Comment.findOne({_id: commentId}, function (err, comment) {
            if (err) next(err);

            if (comment) {
                let newComment = new Comment({
                    postId: postId,
                    commentId: commentId,
                    content: commentStr,
                    postedBy: req.user._id
                });
                newComment.save(function (err, savedComment) {
                    if (err) {
                        next(err);
                    }
                    comment.comments.push(newComment);
                    comment.save(function (err, savedParentComment) {
                        if (err) {
                            next(err);
                        }
                        res.status(200).json({});
                    });
                });
            }
        });
    }else if(!!postId) {

        Post.findOne({_id: postId}, function(err, post){
            let newComment = new Comment({
                postId: postId,
                content: commentStr,
                postedBy: req.user._id
            });
            newComment.save(function (err, savedComment) {
                if (err) {
                    next(err);
                }
                post.comments.push(newComment);
                post.save(function(err, savedPost){
                    if(err) {
                        next(err);
                    }
                    res.status(200).json({});
                })
            });
        });
    }
}

const likeComment = function (req, res, next) {

};