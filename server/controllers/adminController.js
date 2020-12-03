const User = require('../models/User');
const { ErrorHandler } = require('../utils/error');

const loadDashboard = function(req, res) {
    // User.collection.stats((err, stats) => {
    User.find({}, (err, stats) => {
        if (err) {
            return next(err);
        }
        if (!stats) return next(new ErrorHandler(404, 'The item you requested for is not found'));

        if (stats) {
            res.status(200).render('admin/index.ejs', {stats: stats});;
        }
    });

};

module.exports = {
    loadDashboard
}