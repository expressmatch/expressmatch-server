"use strict";

const User            = require("../models/User");
const loginStrategy   = require("./loginStrategy");
const signupStrategy  = require("./signupStrategy");
const fbStrategy      = require("./facebookStrategy");

module.exports = function(passport){

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });
  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
  });

  // Define Strategies
  loginStrategy(passport);
  signupStrategy(passport);
  fbStrategy(passport);

}