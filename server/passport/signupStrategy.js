const LocalStrategy     = require('passport-local').Strategy;
const User              = require('../models/User');
const Profile           = require('../models/Profile');

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

            User.findOne({ 'local.email' :  email }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {

                    var newUser = new User();

                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function(err) {
                        if (err)
                            return done(err);

                        let userProfile = new Profile({
                            user: newUser._id
                        });
                        userProfile.save(function (err) {
                            if (err)
                                return done(err);
                                //TODO: Delete User that has been created too
                        });
                        return done(null, newUser);
                    });
                }
            });    
        });
    }));
};
