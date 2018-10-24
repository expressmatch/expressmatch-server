const express = require('express');
const router = express.Router();
const User = require('../models/User');

module.exports = function (app) {
    app.get('/userprofile', getProfile);
    app.post('/updateprofile', updateProfile);

    return router;
};


//TODO: Move to User routes itself



const getProfile = function (req, res) {
    if (req.user) {
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