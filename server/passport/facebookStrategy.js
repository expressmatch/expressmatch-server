const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const config = require('../config/config');
const mailUtil = require('../utils/mail')();

module.exports = function (passport) {

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        clientID: config.facebookAuth.clientID,
        clientSecret: config.facebookAuth.clientSecret,
        callbackURL: config.facebookAuth.callbackURL,
        profileFields: config.facebookAuth.profileFields
    },

    function (token, refreshToken, profile, done) {

        process.nextTick(function () {

            User.findOne({'facebook.id': profile.id}, function (err, user) {

                if (err)
                    done(err);

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
                        name: `${profile.name.givenName} ${profile.name.familyName}`,
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
                            done(err);

                        if (newUser.profile.email) {
                            mailUtil.setOptions({
                                to: newUser.profile.email,
                                from: `Express To Match <${config.NOREPLY_GMAILUN}>`,
                                subject: 'Welcome to Express To Match!',
                                text: `Welcome! \n\nYou have signed up successfully. You can create posts, share comments, and reply to others comments now. \n\nFind your perfect match. Start Expressing yourself and be social. \n\nRegards\nExpress To Match`,
                            });
                            mailUtil.sendMail().then(() => {
                                // console.log('Mail sent successfully');
                            });
                        }

                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};