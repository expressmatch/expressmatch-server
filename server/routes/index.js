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

	console.log(listRoutes(app));
	return router;
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
