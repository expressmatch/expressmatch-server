const express = require("express");
const router = express.Router();
const adminController = require('../controllers/adminController');

module.exports = function (app) {

    app.get('/admin/console', adminController.getLogin);
    app.post('/admin/console/login', adminController.postLogin);
    app.get('/admin/console/dashboard', adminController.loadDashboard);
    app.get('/admin/console/dashboard', adminController.getUsers);

    return router;
};