const express = require('express');
const router = express.Router();
const User = require('../models/User');
const imageUpload = require("./imageUpload");
const mailUtil = require('../utils/mail')();
const config = require('../config/config');
const ObjectId = require('mongoose').Types.ObjectId;
const { ErrorHandler } = require('../utils/error');

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
            if (err) return next(err);
            if (!user) return next(new ErrorHandler(404, 'The item you requested for is not found'));

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
    User.findOneAndUpdate({_id: req.user._id}, {$set: {profile: req.body.profile}}, {new: true}, function (err, user) {
        if (err)
            next(err);
        if (!user) return next(new ErrorHandler(404, 'The item you requested for is not found'));

        if (user) {
            mailUtil.setOptions({
                to: user.profile.email,
                from: `Express To Match <${config.NOREPLY_GMAILUN}>`,
                subject: 'Profile Updated!',
                text: `Dear user,\n\nYour profile has been successfully updated in our records. Enjoy using our website.\n\nRegards\nExpress To Match. `,
            });
            mailUtil.sendMail().then(() => {
                // console.log('Mail sent successfully');
            });
            res.status(200).json(user.profile);
        }
    });
};

const uploadphoto = function (req, res, next) {

    User.findOne({_id: req.user._id}, function (err, user) {
        if (err)
            next(err);
        if (!user) return next(new ErrorHandler(404, 'The item you requested for is not found'));

        if (user) {
            imageUpload(req, res, (error) => {
                // console.log( 'requestOkokok', req.file );
                // console.log( 'error', error );
                if (error) {
                    console.log('errors', error);
                    res.json({error: error});
                } else {
                    // If File not found
                    if (req.file === undefined) {
                        console.log('Error: No File Selected!');
                        res.json('Error: No File Selected');
                    } else {
                        // If Success
                        const imageName = req.file.key;
                        const imageLocation = req.file.location;

                        user.profile.photo = imageLocation;

                        user.save(function (err, savedUser) {
                            if (err) {
                                next(err);
                            }
                            mailUtil.setOptions({
                                to: savedUser.profile.email,
                                from: `Express To Match <${config.NOREPLY_GMAILUN}>`,
                                subject: 'Photo Updated!',
                                text: `Dear user,\n\nYour picture has been successfully updated in our records. Enjoy using our website.\n\nRegards\nExpress To Match. `,
                            });
                            mailUtil.sendMail().then(() => {
                                // console.log('Mail sent successfully');
                            });
                            res.status(200).json({
                                profile: {
                                    url: savedUser.profile.photo
                                }
                            });
                        });
                    }
                }
            });
        }
    });
};