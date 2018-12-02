const FacebookStrategy  = require('passport-facebook').Strategy;
const User              = require('../models/User');
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


                    //TODO: Update User Schema Unified to both FB and E-mail login
                    newUser.profile = {
                        // age: 21,
                        dob: "",
                        gender: "male",
                        currentCity: "",
                        homeTown: "",
                        motherTongue: "",
                        caste: "",
                        subCaste: "",
                        organization: "",
                        job: "",
                        interests: []
                    };

                    if(profile.birthday){
                        newUser.dob = profile.birthday;
                    }

                    console.log(newUser.profile.birthday);


                    newUser.save(function (err) {
                        if (err)
                            throw err;

                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};