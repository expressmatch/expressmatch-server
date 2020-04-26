const express = require("express");
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const postRoutes = require("./post.routes");
const profileRoutes = require("./profile.routes");
const commentRoutes = require("./comment.route");
const router = express.Router();

module.exports = function(app, passport) {

    app.use("/auth", authRoutes(app, passport));
    app.use("/user", userRoutes(app));
    app.use("/profile", profileRoutes(app));
    app.use("/", postRoutes(app));
    app.use("/", commentRoutes(app));

	return router;
}
