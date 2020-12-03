const express = require("express");
const router = express.Router();
const AdminController = require('../controllers/adminController');

module.exports = function (app) {

    app.get('/admin/console', AdminController.loadDashboard);
    return router;
};