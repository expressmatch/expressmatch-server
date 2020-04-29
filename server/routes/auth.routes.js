const express = require("express");
const router = express.Router();
const User = require('../models/User');
const async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const config = require('../config/config');

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
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/posts', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGN UP =============================
    // =====================================
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('error') });
    });
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/editprofile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope : ['public_profile', 'email']
    }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/posts',
            failureRedirect : '/'
        }));

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        if (req.sessionStore){
            req.sessionStore.destroy(req.sessionID, function(error){
                if (!error){
                    console.log('Session store associated with the session has been destroyed');
                }
            });
        }
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
                var smtpTransport = nodemailer.createTransport({
                    service: 'gmail',//smtp.gmail.com  //in place of service use host...
                    auth: {
                        user: config.NOREPLY_GMAILUN,
                        pass: config.NOREPLY_GMAILPW
                    }, tls: {
                        rejectUnauthorized: false
                    }
                });
                var mailOptions = {
                    to: user.profile.email,
                    from: `Express To Match <${config.NOREPLY_GMAILUN}`,
                    subject: 'Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    req.protocol + '://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                smtpTransport.sendMail(mailOptions, function(err) {
                    req.flash('success', 'An e-mail has been sent to ' + user.profile.email + ' with further instructions.');
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
                var smtpTransport = nodemailer.createTransport({
                    service: 'gmail', //smtp.gmail.com  //in place of service use host...
                    auth: {
                        user: config.NOREPLY_GMAILUN,
                        pass: config.NOREPLY_GMAILPW
                    }, tls: {
                        rejectUnauthorized: false
                    }
                });
                var mailOptions = {
                    to: user.profile.email,
                    from: `Express To Match <${config.NOREPLY_GMAILUN}`,
                    subject: 'Your password has been changed',
                    text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.profile.email + ' has just been changed.\n'
                };
                smtpTransport.sendMail(mailOptions, function(err) {
                    req.flash('success', 'Success! Your password has been changed.');
                    done(err);
                });
            }
        ], function(err) {
            res.redirect('/');
        });
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
