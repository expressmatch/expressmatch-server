const express = require("express");
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const Post = require('../models/Post');
const User = require('../models/User');

module.exports = function (app) {

    //TODO: Change all the apis to router

    app.post('/api/posts', getAllPosts);
    app.post('/post/create', createNewPost);
    app.get('/api/posts/:postId', getPost);
    app.post('/post/:postId/like', likePost);

    return router;
};

const getAllPosts = function (req, res, next) {

    let filters = req.body.filters,
        predicate = [],
        postsRes = [],
        query = null;

    if (filters.quick.caste) predicate.push({'postedBy.caste': req.user.profile.caste});
    if (filters.quick.city) predicate.push({'postedBy.city': req.user.profile.currentCity});
    if (filters.quick.motherTongue) predicate.push({'postedBy.motherTongue': req.user.profile.motherTongue});

    if (predicate.length > 0) {
        query = Post.find({$or: predicate});
    }else{
        query = Post.find({});
    }
    // query.populate({
    //     path: 'comments',
    //     populate: {
    //         path: 'comments',
    //         model: 'Comment'
    //     }
    // }).sort
    query.sort({createdAt: 'desc'}).exec(function (err, posts) {
        if (err)
            next(err);

        if (posts) {
            postsRes = posts.map(post => {
                let obj = post.toJSON();
                obj.isLikedByUser = post.isLikedByUser(req.user);
                return obj;
            });
            res.status(200).json(postsRes);
        }
    });
};

const createNewPost = function (req, res, next) {
    let data = req.body,
        post = new Post(data);

    post.postedBy = {
        userId  : req.user._id,
        caste   : req.user.profile.caste,
        subCaste: req.user.profile.subCaste,
        city    : req.user.profile.currentCity
    };
    post.save(function (err, savedPost) {
        if (err)
            next(err);

        res.status(200).json(savedPost);
    });
};

const getPost = function (req, res, next) {
    Post.findOne({_id: new ObjectId(req.params.postId)}, function (err, post) {
        if (err) next(err);

        if (post) {
            res.status(200).json(post);
        }
    });
    req.json({});
};

const likePost = (req, res, next) => {
    let postRes = null;

    Post.findOne({_id: req.params.postId}, function (err, post) {
        if (post.likes.indexOf(req.user._id) < 0) {
            post.likes.push(req.user._id);
        } else {
            post.likes.splice(post.likes.indexOf(req.user._id), 1);
        }
        post.save(function (err, savedPost) {
            if (err) {
                next(err);
            }
            postRes = {
                ...savedPost.toJSON(),
                'isLikedByUser': savedPost.isLikedByUser(req.user)
            };
            res.status(200).json(postRes);
        });
    })
    // .populate({
    //     path: 'comments',
    //     populate: {
    //         path: 'comments',
    //         model: 'Comment'
    //     }
    // });

};