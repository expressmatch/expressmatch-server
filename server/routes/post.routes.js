const express   = require("express");
const router    = express.Router();
const ObjectId  = require('mongoose').Types.ObjectId;
const Post      = require("../models/Post");

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
    });
};

const createNewPost = function (req, res, next) {
    console.log(req.body);
    let data = req.body;

    let post = new Post(data);
    post.save(function (err) {
        if (err)
            next(err);

        res.status(200).json({});
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
    console.log(req.params.postId);



};