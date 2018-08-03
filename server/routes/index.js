const express = require("express");
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const postRoutes = require("./post.routes");
const router = express.Router();

module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
	    res.render('index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

	    // render the page and pass in any flash data if it exists
	    res.render('login.ejs', { message: req.flash('loginMessage') }); 
	});

	// process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/posts', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

	    // render the page and pass in any flash data if it exists
	    res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/posts', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

	// =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { 
      scope : ['public_profile', 'email']
    }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/posts',
            failureRedirect : '/'
        }));

    // =====================================
    // APP AUTHENTICATION FOR ALL ROUTES ===
    // =====================================
    // authenticating rest of the server and UI routes
    app.use('/', function(req, res){
    	console.log('Authentication middleware called at /');
    	if(req.isAuthenticated()){
    		req.next();
    	}else{
    		res.redirect('/');
    	}
    });

	// =====================================
	// PROFILE SECTION =====================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
	    res.render('profile.ejs', {
	        user : req.user // get the user out of session and pass to template
	    });
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
	    req.logout();
	    res.redirect('/');
	});

	app.use("/user", userRoutes);
	app.use("/auth", authRoutes);
	app.use(postRoutes(app));

	console.log(listRoutes(app));
	return router;
}


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


function listRoutes(app, routes, stack, parent){

    parent = parent || '';
    if(stack){
        stack.forEach(function(r){
            if (r.route && r.route.path){
                var method = '';

                for(method in r.route.methods){
                    if(r.route.methods[method]){
                        routes.push({method: method.toUpperCase(), path: parent + r.route.path});
                    }
                }

            } else if (r.handle && r.handle.name == 'router') {
                const routerName = r.regexp.source.replace("^\\","").replace("\\/?(?=\\/|$)","");
                return listRoutes(app, routes, r.handle.stack, parent + routerName);
            }
        });
        return routes;
    } else {
        return listRoutes(app, [], app._router.stack);
    }
}