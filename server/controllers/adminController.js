const User = require('../models/User');
const { ErrorHandler } = require('../utils/error');
const bcrypt = require("bcrypt");

const getLogin = function(req, res) {

    res.status(200).render('admin/login.ejs');
};

const postLogin = function(req, res) {
    res.status(200).redirect('/admin/console/dashboard');

    //TODO: Enable
    // User.findOne({ 'local.email' :  req.email, 'local.password': bcrypt.compareSync('local.password', req.password) }, function(err, user) {
    //     if (err)
    //         return done(err);
    //
    //     if (!user)
    //         return done(null, false, req.flash('error', 'No user found.'));
    //
    //     if (!user.validPassword(password))
    //         return done(null, false, req.flash('error', 'Oops! Wrong password.'));
    //
    //     res.status(200).redirect('/admin/console/dashboard');
    // });
};

const loadDashboard = function(req, res) {
    res.render('admin/index.ejs');
};

const getUsers = function(req, res) {
    User.find({}, (err, users) => {
        if (err) {
            return next(err);
        }
        if (!users) return next(new ErrorHandler(404, 'The item you requested for is not found'));

        if (users) {
            res.status(200).json({users: users});
        }
    });
}

module.exports = {
    getLogin,
    postLogin,
    loadDashboard,
    getUsers
}