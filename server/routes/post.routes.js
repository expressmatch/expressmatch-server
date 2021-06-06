const express = require("express");
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const Post = require('../models/Post');
const Preference = require('../models/Preference');
const Comment = require('../models/Comment');
const User = require('../models/User');
const { ErrorHandler } = require('../utils/error');

module.exports = function (app) {

    //TODO: Change all the apis to router

    app.post('/api/posts', getAllPosts);
    app.post('/api/userposts', getAllUserPosts);
    app.post('/api/post/create', createNewPost);
    app.get('/api/post/:postId', getPost);
    app.get('/api/post/:postId/likes', getPostLikes);
    app.post('/api/post/:postId/like', likePost);
    app.get('/api/post/:postId/interests', getPostInterests);
    app.post('/api/post/:postId/interest', sendInterest);
    app.post('/api/post/:postId/delete', deletePost);
    app.post('/api/post/:postId/spam', reportSpam);

    return router;
};

const getAllPosts = function (req, res, next) {

    let filters = req.body.filters,
        pageNumber = req.body.pageNumber || 0,
        limit = 25,
        skip = (pageNumber * limit),
        predicate = [],
        postsRes = [],
        query = null,
        startDate = null,
        endDate = null,
        filterPredicate,
        preferencePredicate,
        spamPredicate,
        datePredicate;

    Preference.findOne({user: new ObjectId(req.user._id)}, function (err, preference) {
        if (err) return next(err);
        //if (!preference) return next(new ErrorHandler(404, 'The item you requested for is not found'));
        //TODO - Run script to enable preference on all users, then enable this.

        if (preference) {
            predicate = [];

            if (preference.currentCity) predicate.push({'postedBy.city': req.user.profile.currentCity});
            if (preference.caste) predicate.push({'postedBy.caste': req.user.profile.caste});
            if (preference.motherTongue) predicate.push({'postedBy.motherTongue': req.user.profile.motherTongue});

            preferencePredicate = {$and: predicate};
        }
        spamPredicate = {$and: [{spam: {$nin: [req.user]}}, {'spam.5': {$exists: false}}]};

        if (predicate.length > 0) {
            query = Post.find({$and: [spamPredicate, preferencePredicate]});
        } else {
            query = Post.find({$and: [spamPredicate]});
        }

        query
            .sort({createdAt: 'desc'})
            .limit(limit)
            .skip(skip)
            .exec(function (err, posts) {
                if (err) {
                    return next(err);
                }

                Post.countDocuments(query).exec((count_error, count) => {
                    if (err) {
                        return next(count_error);
                    }

                    if (posts) {
                        postsRes = posts.map(post => {
                            let obj = post.toJSON();
                            obj.isLikedByUser = post.isLikedByUser(req.user);
                            obj.isCreatedByUser = post.isCreatedByUser(req.user);
                            obj.isInterestedByUser = post.isInterestedByUser(req.user);
                            return obj;
                        });
                        res.status(200).json({
                            hasNext: !!(count === limit),
                            posts: postsRes
                        });
                    }
                });
            });
    });


    // if (filters.quick.caste) predicate.push({'postedBy.caste': req.user.profile.caste});
    // if (filters.quick.city) predicate.push({'postedBy.city': req.user.profile.currentCity});
    // if (filters.quick.motherTongue) predicate.push({'postedBy.motherTongue': req.user.profile.motherTongue});
    //
    // if (filters.date) {
    //     startDate = new Date(filters.date);
    //     startDate.setHours(0, 0, 0, 0);
    //     endDate = new Date(filters.date);
    //     endDate.setDate(endDate.getDate() + 1);
    //     endDate.setHours(0, 0, 0, 0);
    // }
    //
    // filterPredicate = {$and: predicate};
    //
    // datePredicate = {'createdAt': {"$gte": startDate, "$lt": endDate}};
    //
    // spamPredicate = {$and: [{spam: {$nin: [req.user]}}, {'spam.5': {$exists: false}}]};
    //
    // if (predicate.length > 0) {
    //     query = Post.find({$and: [spamPredicate, filterPredicate]});
    // } else {
    //     query = Post.find({$and: [spamPredicate]});
    // }
};

const getAllUserPosts = function(req, res, next) {
    let pageNumber = req.body.pageNumber || 0,
        limit = 25,
        skip = (pageNumber * limit),
        postsRes = [],
        query = null;

    query = Post.find({'postedBy.userId': req.user._id});

    query
        .sort({createdAt: 'desc'})
        .limit(limit)
        .skip(skip)
        .exec(function (err, posts) {
            if (err) {
                return next(err);
            }

            Post.countDocuments(query).exec((count_error, count) => {
                if (err) {
                    return next(count_error);
                }

                if (posts) {
                    postsRes = posts.map(post => {
                        let obj = post.toJSON();
                        obj.isLikedByUser = post.isLikedByUser(req.user);
                        obj.isCreatedByUser = post.isCreatedByUser(req.user);
                        obj.isInterestedByUser = post.isInterestedByUser(req.user);
                        return obj;
                    });
                    res.status(200).json({
                        hasNext: !!(count === limit),
                        posts: postsRes
                    });
                }
            });
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
            return next(err);

        res.status(200).json(savedPost);
    });
};

const getPost = function (req, res, next) {
    Post.findOne({_id: new ObjectId(req.params.postId)}, function (err, post) {
        if (err) return next(err);
        if (!post) return next(new ErrorHandler(404, 'The item you requested for is not found'));

        if (post) {
            let postsRes = {
                ...post.toJSON(),
                'isLikedByUser': post.isLikedByUser(req.user),
                'isInterestedByUser': post.isInterestedByUser(req.user),
                'isCreatedByUser': post.isCreatedByUser(req.user)
            };
            res.status(200).json(postsRes);
        }
    });
};

const getPostLikes = function(req, res, next){
    Post.findOne({_id: new ObjectId(req.params.postId)}, function (err, post) {
        if (err) return next(err);
        if (!post) return next(new ErrorHandler(404, 'The item you requested for is not found'));

        if (post) {
            res.status(200).json(post.likes);
        }
    }).populate({
        path: 'likes',
        model: 'User',
        select: { '_id': 1, 'profile.name': 1, 'profile.photo': 1, 'profile.email': 1 }
    });
};

const getPostInterests = function(req, res, next){
    Post.findOne({_id: new ObjectId(req.params.postId)}, function (err, post) {
        if (err) return next(err);
        if (!post) return next(new ErrorHandler(404, 'The item you requested for is not found'));

        if (post) {
            res.status(200).json(post.interests);
        }
    }).populate({
        path: 'interests',
        model: 'User',
        select: { '_id': 1, 'profile.name': 1, 'profile.photo': 1, 'profile.email': 1 }
    });
};

const likePost = (req, res, next) => {
    let postRes = null;

    Post.findOne({_id: req.params.postId}, function (err, post) {
        if (err) return next(err);
        if (!post) return next(new ErrorHandler(404, 'The item you requested for is not found'));

        if (post.likes.indexOf(req.user._id) < 0) {
            post.likes.push(req.user._id);
        } else {
            post.likes.splice(post.likes.indexOf(req.user._id), 1);
        }
        post.save(function (err, savedPost) {
            if (err) {
                return next(err);
            }
            postRes = {
                ...savedPost.toJSON(),
                'isLikedByUser': savedPost.isLikedByUser(req.user),
                'isCreatedByUser': savedPost.isCreatedByUser(req.user),
                'isInterestedByUser': savedPost.isInterestedByUser(req.user)
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

const sendInterest = (req, res, next) => {
    let postRes = null;

    Post.findOne({_id: req.params.postId}, function (err, post) {
        if (err) return next(err);
        if (!post) return next(new ErrorHandler(404, 'The item you requested for is not found'));

        if (post.interests.indexOf(req.user._id) < 0) {
            post.interests.push(req.user._id);
        } else {
            post.interests.splice(post.interests.indexOf(req.user._id), 1);
        }
        post.save(function (err, savedPost) {
            if (err) {
                return next(err);
            }
            postRes = {
                ...savedPost.toJSON(),
                'isLikedByUser': savedPost.isLikedByUser(req.user),
                'isCreatedByUser': savedPost.isCreatedByUser(req.user),
                'isInterestedByUser': savedPost.isInterestedByUser(req.user)
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
    Post.findOneAndDelete({
        _id: new ObjectId(req.params.postId),
        "postedBy.userId": new ObjectId(req.user._id)
    }, function (err, post) {
        if (err) return next(err);
        if (!post) return next(new ErrorHandler(404, 'The item you requested for is not found'));

        if (post) {
            Comment.deleteMany({postId: new ObjectId(req.params.postId)}, function (err) {
                if (err) next(err);

                res.status(200).json({});
            });
        }
    });
};

const reportSpam = (req, res, next) => {

    Post.findOne({_id: req.params.postId}, function (err, post) {
        if (err) return next(err);
        if (!post) return next(new ErrorHandler(404, 'The item you requested for is not found'));

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