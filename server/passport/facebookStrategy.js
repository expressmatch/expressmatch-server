const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const configAuth = require('../config/auth');

module.exports = function (passport) {

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: configAuth.facebookAuth.profileFields
    },

    function (token, refreshToken, profile, done) {

        process.nextTick(function () {

            User.findOne({'facebook.id': profile.id}, function (err, user) {

                if (err)
                    next(err);

                if (user) {
                    return done(null, user);
                } else {
                    let newUser = new User();

                    newUser.facebook = {
                        id: profile.id,
                        token: token,
                        username: profile.username
                    };

                    //TODO: Update User Schema Unified to both FB and E-mail login
                    newUser.profile = {
                        name: profile.displayName || (profile.emails && profile.emails[0].value),
                        email: profile.emails && profile.emails[0].value,
                        about: "",
                        photo: profile.photos[0] && profile.photos[0].value || "",
                        dob: profile.birthday || "",
                        gender: profile.gender || "",
                        currentCity: profile.location || "",
                        homeTown: profile.hometown || "",
                        motherTongue: "",
                        caste: "",
                        subCaste: "",
                        job: "",
                        organization: ""
                    };

                    newUser.save(function (err) {
                        if (err)
                            next(err);

                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};