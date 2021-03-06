const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer();
const mailUtil = require('../utils/mail')();
const config = require('../config/config');

module.exports = function (app) {

    app.get('/api/user', getUser);
    app.post('/api/contactus', upload.none(), contactUs);

    return router;
};

const getUser = function (req, res, next) {
    res.status(200).json({
        name: req.user.profile.name,
        email: req.user.profile.email,
        photo: req.user.profile.photo,
        id: req.user._id //TODO: Is this safe? Added for checking other profiles
    });
};

const contactUs = function (req, res, next) {
    mailUtil.setOptions({
        to: config.ADMIN_GMAILUN,
        from: `${req.body.name} <${req.body.email}>`,
        subject: 'Sugesstion Received',
        text: `${req.body.content}\n\nFrom \n${req.body.name} \n\nEmail: ${req.body.email} `,
    });
    mailUtil.sendMail().then(() => {
        console.log('Mail sent: New message from Contact Us');
    }).catch(err => {
        console.error('Error sending mail: Contact Us\n ', err);
    });
    res.status(200).json({});
};