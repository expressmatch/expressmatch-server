const express = require("express");
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');

module.exports = function (app) {

    //TODO: Change all the apis to router

    app.post('/api/posts', getAllPosts);
    app.post('/post/create', createNewPost);
    app.get('/api/post/:postId', getPost);
    app.get('/api/post/:postId/likes', getPostLikes);
    app.post('/post/:postId/like', likePost);
    app.post('/post/:postId/delete', deletePost);
    app.post('/post/:postId/spam', reportSpam);

    return router;
};

const getAllPosts = function (req, res, next) {

    let filters = req.body.filters,
        predicate = [],
        postsRes = [],
        query = null,
        startDate = null,
        endDate = null,
        filterPredicate,
        spamPredicate,
        datePredicate;

    if (filters.quick.caste) predicate.push({'postedBy.caste': req.user.profile.caste});
    if (filters.quick.city) predicate.push({'postedBy.city': req.user.profile.currentCity});
    if (filters.quick.motherTongue) predicate.push({'postedBy.motherTongue': req.user.profile.motherTongue});

    if (filters.date) {
        startDate = new Date(filters.date);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(filters.date);
        endDate.setDate(endDate.getDate() + 1);
        endDate.setHours(0, 0, 0, 0);
    }
    console.debug(startDate);
    console.debug(endDate);

    filterPredicate = {$or: predicate};
    datePredicate = {'createdAt': {"$gte": startDate, "$lt": endDate}};
    spamPredicate = {$and: [{spam: {$nin: [req.user]}}, {'spam.5': {$exists: false}}]};

    if (predicate.length > 0) {
        query = Post.find({$and: [datePredicate, spamPredicate, filterPredicate]});
    } else {
        query = Post.find({$and: [datePredicate, spamPredicate]});
    }

    query.sort({createdAt: 'desc'}).exec(function (err, posts) {
        if (err)
            next(err);

        if (posts) {
            postsRes = posts.map(post => {
                let obj = post.toJSON();
                obj.isLikedByUser = post.isLikedByUser(req.user);
                obj.isCreatedByUser = post.isCreatedByUser(req.user);
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
        userId: req.user._id,
        caste: req.user.profile.caste,
        subCaste: req.user.profile.subCaste,
        city: req.user.profile.currentCity,
        motherTongue: req.user.profile.motherTongue
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
};

const getPostLikes = function(req, res, next){
    Post.findOne({_id: new ObjectId(req.params.postId)}, function (err, post) {
        if (err) next(err);

        if (post) {
            res.status(200).json(post.likes);
        }
    }).populate({
        path: 'likes',
        model: 'User',
        select: { 'profile.name': 1, 'profile.photo': 1, 'profile.email': 1 }
    });
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

const deletePost = function (req, res, next) {
    Post.findOne({
        _id: new ObjectId(req.params.postId),
        "postedBy.userId": new ObjectId(req.user._id)
    }, function (err, post) {
        if (err) next(err);

        if (post) {
            Post.remove({_id: req.params.postId}, function (err) {
                if (err) next(err);

                Comment.remove({postId: new ObjectId(req.params.postId)}, function (err) {
                    if (err) next(err);

                    res.status(200).json({});
                });
            });
        }
    });
};

const reportSpam = (req, res, next) => {

    Post.findOne({_id: req.params.postId}, function (err, post) {
        if (post.spam.indexOf(req.user._id) < 0) {
            post.spam.push(req.user._id);
        }
        post.save(function (err, savedPost) {
            if (err) {
                next(err);
            }
            res.status(200).json({});
        });
    })

};