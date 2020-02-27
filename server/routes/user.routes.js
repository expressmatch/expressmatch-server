const express = require("express");
const router = express.Router();
const mailUtil = require('../utils/mail');

module.exports = function (app) {

    app.get('/api/user', getUser);
    app.post('/api/contactus', contactUs);

    return router;
};

const getUser = function (req, res, next) {
    res.status(200).json({
        name: req.user.profile.name,
        email:req.user.profile.email,
        photo: req.user.profile.photo
    });
};

const contactUs = function(req, res, next) {
    res.redirect('back');
};