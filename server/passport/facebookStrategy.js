const FacebookStrategy  = require('passport-facebook').Strategy;
const User              = require('../models/User');
const Profile           = require('../models/Profile');
const configAuth        = require('../config/auth');

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
                    throw err;

                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new User();

                    newUser.facebook = {
                        id: profile.id,
                        token: token,
                        name: profile.name.givenName + ' ' + profile.name.familyName,
                        email: profile.emails && profile.emails[0].value,
                        username: profile.username,
                        gender: profile.gender,
                        photos: profile.photos
                    };

                    newUser.save(function (err) {
                        if (err)
                            throw err;

                        let userProfile = new Profile({
                            user: newUser._id,
                            name: profile.name.givenName + ' ' + profile.name.familyName,
                            gender: profile.gender,
                            //photos: profile.photos //TODO: Photos Format
                        });

                        userProfile.save(function (err) {
                            if (err)
                                throw err;
                                //TODO: Delete User that has been created too
                        });
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};