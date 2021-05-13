const express = require('express');
const router = express.Router();
const Preference = require('../models/Preference');
const mailUtil = require('../utils/mail')();
const config = require('../config/config');
const ObjectId = require('mongoose').Types.ObjectId;
const { ErrorHandler } = require('../utils/error');

module.exports = function (app) {
    app.get('/api/preference', getPreference);
    app.post('/api/preference', savePreference);

    return router;
};


//TODO: Move to User routes itself


const getPreference = function (req, res, next) {
    if (req.user) {

        Preference.findOne({user: new ObjectId(req.user._id)}, function (err, preference) {
            if (err) return next(err);
            // if (!preference) return next(new ErrorHandler(404, 'The item you requested for is not found'));
            //TODO - Run script to enable preference on all users, then enable this.

            if (preference) {
                res.status(200).json(preference);
            }
        });
    }
};

const savePreference = function (req, res, next) {
    Preference.findOneAndUpdate({user: req.user._id},
        {$set: {
            currentCity: req.body.currentCity,
            caste: req.body.caste,
            motherTongue: req.body.motherTongue
        }},
        {upsert: true, new: true},
        function (err, preference) {
            if (err)
                next(err);
            if (!preference) return next(new ErrorHandler(404, 'The item you requested for is not found'));

            if (preference) {
                mailUtil.setOptions({
                    // to: user.profile.email,
                    to: req.user.email,
                    from: `Express To Match <${config.NOREPLY_GMAILUN}>`,
                    subject: 'Preference Updated!',
                    text: `Dear user,\n\nYour preference has been successfully updated in our records. Enjoy using our website.\n\nRegards\nExpress To Match. `,
                });
                mailUtil.sendMail().then(() => {
                    console.log('Mail sent: Preference Updated successfully');
                }).catch(err => {
                    console.error('Error sending mail: Preference Update\n ', err);
                });
                res.status(200).json(preference);
            }
        });
};