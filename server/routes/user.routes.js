const express = require("express");
const router = express.Router();

module.exports = function (app) {

    app.get('/api/user', getUser);

    return router;
};

const getUser = function (req, res, next) {
    res.status(200).json({
        name: req.user.profile.name,
        email:req.user.profile.email,
        photo: req.user.profile.photo
    });
};