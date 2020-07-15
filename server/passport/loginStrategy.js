const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function(passport) {

    // =========================================================================
    // LOCAL LOGIN ============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {

        User.findOne({ 'local.email' :  email }, function(err, user) {
            if (err)
                return done(err);

            if (!user)
                return done(null, false, req.flash('error', 'No user found.'));

            if (!user.validPassword(password))
                return done(null, false, req.flash('error', 'Oops! Wrong password.'));

            if (!user.verified)
                return done(null, false, req.flash('error', 'Your account has not been verified.'));

            return done(null, user);
        });
    }));
};


	