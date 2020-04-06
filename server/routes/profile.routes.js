const express = require('express');
const router = express.Router();
const User = require('../models/User');

const ObjectId = require('mongoose').Types.ObjectId;

module.exports = function (app) {
    app.get('/api/userprofile', getProfile);
    app.post('/api/updateprofile', updateProfile);
    app.post('/api/uploadphoto', uploadphoto);

    return router;
};


//TODO: Move to User routes itself



const getProfile = function (req, res, next) {
    if (req.query.userId) {
        User.findOne({_id: new ObjectId(req.query.userId)}, function (err, user) {
            if (err) next(err);

            if (user) {
                res.status(200).json(user.profile);
            }
        });
    }
    else if (req.user) {
        res.status(200).json(req.user.profile);
    }
};

const updateProfile = function (req, res, next) {
    User.findOneAndUpdate({_id: req.user._id}, {$set: {profile: req.body.profile}}, {new: true}, function(err, user) {
        if (err)
            next(err);

        if (user) {
            res.status(200).json(user.profile);
        }
    });
};

const uploadphoto = function (req, res, next) {
    User.findOneAndUpdate({_id: req.user._id}, {$set: {photo: req.body.picture}}, {new: true}, function(err, user) {
        if (err)
            next(err);

        if (user) {
            res.status(200).json(user.profile);
        }
    });
};