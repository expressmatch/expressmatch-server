const LocalStrategy     = require('passport-local').Strategy;
const User              = require('../models/User');
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
                        name: req.body.name.trim(),
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
                        organization: ""
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
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};
