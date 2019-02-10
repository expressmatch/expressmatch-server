const express = require("express");
const router = express.Router();

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
            res.render('emlogin.ejs', { message: req.flash('error') });
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
        res.render('emsignup.ejs', { message: req.flash('error') });
    });
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
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
        req.logOut();
        req.session.destroy();
        res.redirect('/');
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
