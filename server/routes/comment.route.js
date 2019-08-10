const express = require("express");
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const Post = require('../models/Post');
const Comment = require('../models/Comment');

module.exports = function (app) {

    app.post('/api/comments', getAllPostComments);
    app.post('/api/comment', postComment);
    app.post('/comment/:commentId/like', likeComment);
    app.get('/api/comment/:commentId/likes', getCommentLikes);

    return router;
};

const getAllPostComments = function (req, res, next) {
    let postId = req.body.postId,
        commentRes = [],
        replies = [],
        replyRes = {};

    if (!!postId) {

        Post.findOne({_id: postId}, function (err, post) {
            if (err) next(err);

            commentRes = post.comments.map(comment => {
                let obj = comment.toJSON();
                obj.isLikedByUser = comment.isLikedByUser(req.user);
                obj.isCreatedByUser = comment.isCreatedByUser(req.user);

                replies = comment.comments.map(reply => {
                    replyRes = reply.toJSON();
                    replyRes.isLikedByUser = reply.isLikedByUser(req.user);
                    replyRes.isCreatedByUser = reply.isCreatedByUser(req.user);

                    return replyRes;
                });
                obj.comments = replies;
                return obj;
            });

            if (post) {
                res.status(200).json(commentRes);
            }
        }).populate({
            path: 'comments',
            populate: [{
                path: 'comments',
                model: 'Comment',
                populate: {
                    path: 'postedBy',
                    model: 'User',
                    select: { 'profile.name': 1, 'profile.photo': 1, 'profile.email': 1 }
                }
            },
            {
                path: 'postedBy',
                model: 'User',
                select: { 'profile.name': 1, 'profile.photo': 1, 'profile.email': 1 }
            }]
        });
    }
};

const postComment = function (req, res, next) {
    let postId = req.body.postId,
        commentId = req.body.commentId,
        commentStr = req.body.comment;

    if (!!commentId) {

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
                        Comment.populate(savedComment, {
                            path: "postedBy",
                            select: { 'profile.name': 1, 'profile.photo': 1, 'profile.email': 1 }
                        }, function (err) {
                            res.status(200).json(savedComment);
                        });
                    });
                });
            }
        });
    } else if (!!postId) {

        Post.findOne({_id: postId}, function (err, post) {
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
                post.save(function (err, savedPost) {
                    if (err) {
                        next(err);
                    }
                    Comment.populate(savedComment, {
                        path: "postedBy",
                        select: { 'profile.name': 1, 'profile.photo': 1, 'profile.email': 1 }
                    }, function (err, comment) {
                        res.status(200).json(comment);
                    });
                })
            });
        });
    }
}

const likeComment = function (req, res, next) {
    let commentRes = null;

    Comment.findOne({_id: req.params.commentId}, function (err, comment) {
        if (comment.likes.indexOf(req.user._id) < 0) {
            comment.likes.push(req.user._id);
        } else {
            comment.likes.splice(comment.likes.indexOf(req.user._id), 1);
        }
        comment.save(function (err, savedcomment) {
            if (err) {
                next(err);
            }
            commentRes = {
                ...savedcomment.toJSON(),
                'isLikedByUser': savedcomment.isLikedByUser(req.user)
            };
            res.status(200).json(commentRes);
        });
    });
};

const getCommentLikes = function(req, res, next){
    Comment.findOne({_id: new ObjectId(req.params.commentId)}, function (err, comment) {
        if (err) next(err);

        if (comment) {
            res.status(200).json(comment.likes);
        }
    }).populate({
        path: 'likes',
        model: 'User',
        select: { '_id': 1, 'profile.name': 1, 'profile.photo': 1, 'profile.email': 1 }
    });
};