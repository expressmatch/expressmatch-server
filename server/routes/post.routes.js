const express = require("express");
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const Post = require("../models/Post");

module.exports = function (app) {

    //TODO: Change all the apis to router

    app.get('/api/posts', getAllPosts);
    app.post('/post/create', createNewPost);
    app.get('/api/posts/:postId', getPost);
    app.post('/post/:postId/like', likePost)

    return router;
};

const getAllPosts = function (req, res, next) {
    Post.find({}, function (err, posts) {
        if (err)
            next(err); //Express will catch error and handle it

        if (posts) {
            res.status(200).json(posts);
        }
    }).sort({createdAt: 'desc'});
};

const createNewPost = function (req, res, next) {
    let data = req.body;

    let post = new Post(data);
    post.save(function (err) {
        if (err)
            next(err);

        res.status(200).json(post);
    });
};

const getPost = function (req, res, next) {
    Post.findOne({_id: new ObjectId(req.params.postId)}, function (err, post) {
        if (err) next(err);

        if (post) {
            res.status(200).json(post);
        }
    })
    req.json({});
};

const likePost = (req, res, next) => {

    //TODO: Change it to findOneandUpdate
    Post.findOne({_id: req.params.postId}, function (err, post) {
        if (post.likes.indexOf(req.user._id) < 0) {
            post.likes.push(req.user._id);
        } else {
            post.likes.splice(post.likes.indexOf(req.user._id), 1);
        }
        post.save(function (err, post) {
            if (err) {
                next(err);
            }
            //TODO: Virtual property to check for isLikedByCurrentUser
            res.status(200).json(post);
        });
    });

};