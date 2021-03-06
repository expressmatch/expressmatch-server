const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const config = require('../config/config');
const mailUtil = require('../utils/mail')();
const emUtils = require('./../utils/emUtils');
//const Profile           = require('../models/Profile');

module.exports = function(passport) {

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {

        process.nextTick(function() {

            if(!req.body.name.trim().length){
                return done(null, false, req.flash('error', 'Name cannot be empty.'));
            }
            if(!email.trim().length){
                //TODO: Validate Email Entry
                return done(null, false, req.flash('error', 'Email cannot be empty.'));
            }
            if(!password.trim().length){
                return done(null, false, req.flash('error', 'Password cannot be empty.'));
            }

            User.findOne({ 'local.email' :  email }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {
                    return done(null, false, req.flash('error', 'That email is already taken.'));
                } else {

                    var newUser = new User();

                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.profile = {
                        name: emUtils.titleCase(req.body.name.trim()),
                        email: email,
                        about: "",
                        photo: "",
                        dob: null,
                        gender: "",
                        currentCity: "",
                        homeTown: "",
                        motherTongue: "",
                        caste: "",
                        subCaste: "",
                        job: "",
                        organization: "",
                        verified: false
                    };

                    newUser.save(function(err) {
                        if (err)
                            return done(err);

                        // let userProfile = new Profile({
                        //     user: newUser._id
                        // });
                        // userProfile.save(function (err) {
                        //     if (err)
                        //         return done(err);
                        //         //TODO: Delete User that has been created too
                        // });

                        if (newUser.profile.email) {
                            mailUtil.setOptions({
                                to: newUser.profile.email,
                                from: `Express To Match <${config.NOREPLY_GMAILUN}>`,
                                subject: 'Welcome to Express To Match!',
                                text: `Welcome! \n\nYou have signed up successfully. You can create posts, share comments, and reply to others comments now. \n\nFind your perfect match. Start Expressing yourself and be social. \n\nRegards\nExpress To Match`,
                            });
                            mailUtil.sendMail().then(() => {
                                console.log('Mail sent: User signed Up with email successfully');
                            }).catch(err => {
                                console.error('Error sending mail: User Sign-up with email\n ', err);
                            });
                        }

                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};
