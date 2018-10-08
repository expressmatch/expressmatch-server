const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const User = require("../models/User");

module.exports = function (app) {
    app.get('/userprofile', getProfile);

    return router;
};

const getProfile = function (req, res, next) {
    Profile.find({user: req.user}, function (err, profile) {
        if (err)
            next(err);

        if (profile) {
            res.status(200).json(profile);
        }
    });
};