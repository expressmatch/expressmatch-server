const express = require("express");
const router = express.Router();
const User = require('../models/User');
const Token = require('../models/Token');
const async = require("async");
const crypto = require("crypto");
const config = require('../config/config');
const mailUtil = require('../utils/mail')();

module.exports = function(app, passport){

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        if(req.isAuthenticated()){
            res.redirect('/posts');
        }else{
            res.render('index.ejs');
        }
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    app.get('/login', function(req, res) {
        if(req.isAuthenticated()){
            res.redirect('/posts');
        }else{
            res.render('login.ejs');
        }
    });
    app.post('/login', keepMeSignedIn, passport.authenticate('local-login', {
            successRedirect : '/posts', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        })
    );

    // =====================================
    // SIGN UP =============================
    // =====================================
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('error') });
    });
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/verify', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    app.get('/auth/facebook', passport.authenticate('facebook', {
        authType: 'rerequest',
        scope : ['public_profile', 'email']
    }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/posts',
            failureRedirect : '/'
        }));

    // =====================================
    // VERIFICATION ROUTES =================
    // =====================================
    app.get('/verify', function(req, res) {
        res.render('verify.ejs', { message: req.flash('error') });
    });
    app.post('/confirmation', function(req, res, next) {
        Token.findOne({ token: req.body.token }, function (err, token) {
            if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });

            // If we found a token, find a matching user
            User.findOne({ _id: token._userId, email: req.body.email }, function (err, user) {
                if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
                if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

                // Verify and save the user
                user.isVerified = true;
                user.save(function (err) {
                    if (err) { return res.status(500).send({ msg: err.message }); }
                    res.status(200).send("The account has been verified. Please log in.");
                });
            });
        });
    });
    app.post('/resend', function(req, res, next) {

    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logOut();
        req.session.destroy();
        res.redirect('/');
    });

    // =====================================
    // FORGOT PASSWORD =====================
    // =====================================
    app.get('/forgot', function(req, res) {
        res.render('forgot.ejs');
    });
    app.post('/forgot', function(req, res, next) {
        async.waterfall([
            function(done) {
                crypto.randomBytes(20, function(err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },
            function(token, done) {
                User.findOne({ 'local.email': req.body.email }, function(err, user) {
                    if (!user) {
                        req.flash('error', 'No account with that email address exists.');
                        return res.redirect('/forgot');
                    }

                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                    user.save(function(err) {
                        done(err, token, user);
                    });
                });
            },
            function(token, user, done) {
                mailUtil.setOptions({
                    to: user.profile.email,
                    from: `Express To Match <${config.NOREPLY_GMAILUN}`,
                    subject: 'Forgot Password',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    req.protocol + '://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n\nRegards\nExpress To Match. '
                });
                mailUtil.sendMail().then(() => {
                    console.log('Mail sent: Forgot Password');
                    req.flash('success', 'An e-mail has been sent to ' + user.profile.email + ' with further instructions.');
                    done(null, 'done');
                }).catch(err => {
                    console.error('Error sending mail: Forgot Password\n ', err);
                    done(err, 'done');
                });
            }
        ], function(err) {
            if (err) return next(err);
            res.redirect('/forgot');
        });
    });

    app.get('/reset/:token', function(req, res) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) {
                req.flash('error', 'Password reset token is invalid or has expired.');
                return res.redirect('/forgot');
            }
            res.render('reset.ejs', {token: req.params.token});
        });
    });

    app.post('/reset/:token', function(req, res) {
        async.waterfall([
            function(done) {
                User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                    if (!user) {
                        req.flash('error', 'Password reset token is invalid or has expired.');
                        return res.redirect('back');
                    }
                    if (req.body.password.trim().length === 0 || req.body.confirm.trim().length === 0){
                        req.flash('error', 'Password cannot be empty.');
                        return res.redirect('back');
                    }
                    else if(req.body.password === req.body.confirm) {
                        user.local.password = user.generateHash(req.body.password);
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;

                        user.save(function(err) {
                            req.logIn(user, function(err) {
                                done(err, user);
                            });
                        });
                    } else {
                        req.flash('error', 'Passwords do not match.');
                        return res.redirect('back');
                    }
                });
            },
            function(user, done) {
                mailUtil.setOptions({
                    to: user.profile.email,
                    from: `Express To Match <${config.NOREPLY_GMAILUN}`,
                    subject: 'Your password has been changed',
                    text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.profile.email + ' has just been changed.\n\nRegards\nExpress To Match. '
                });
                mailUtil.sendMail().then(() => {
                    console.log('Mail sent: Reset Password');
                    req.flash('success', 'Success! Your password has been changed.');
                    done(null, 'done');
                }).catch(err => {
                    console.error('Error sending mail: Reset Password\n ', err);
                    done(err, 'done');
                });
            }
        ], function(err) {
            res.redirect('/');
        });
    });

    app.get('/privacy', function(req, res) {
        res.render('privacy.ejs');
    });

    app.get('/terms', function(req, res) {
        res.render('terms.ejs');
    });


    // =====================================
    // APP AUTHENTICATION FOR ALL ROUTES ===
    // =====================================
    app.use('/', function(req, res){
        if(req.isAuthenticated()){
            req.next();
        }else{
            res.redirect('/');
        }
    });

    return router;
};


const keepMeSignedIn = function( req, res, next) {
    if (!req.body.keepMeSignedIn) {
        req.session.cookie.expires = false;
    }
    next();
};
