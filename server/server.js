const path 					= require('path');
const express 				= require('express');
const app 					= express();
const helmet 				= require('helmet');
const compression 			= require('compression');
const morgan       			= require('morgan');
const cookieParser 			= require('cookie-parser');
const bodyParser 			= require('body-parser');
const session      			= require('express-session');
const mongoStore 			= require('connect-mongo')(session);
const flash    				= require('connect-flash');
const webpack 				= require('webpack');
const webpackDevMiddleware 	= require('webpack-dev-middleware');
const webpackHotMiddleware 	= require('webpack-hot-middleware');
const webpackConfig 		= require('../webpack.config.dev');
const compiler 				= webpack(webpackConfig);
const passport 				= require('passport');
const initPassport			= require("./passport");
const initRoutes			= require("./routes");
const mongoose 				= require('mongoose');
const dbConfig 				= require('./config/database');
const port 					= process.env.PORT || 8080;
const dotenv				= require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.development') });

//-------Configurations---------//

//const db = connect();
mongoose.connect(dbConfig.url, {}, () => {
	console.log("DB Connected Succesfully.");
});
mongoose.connection.on('error', function(err) {
    console.error('MongoDB error: %s', err);
});

initPassport(passport);

app.use(webpackDevMiddleware(compiler, {
	publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler, {
	log: false,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));
app.use(compression());
app.use(helmet());
app.use(morgan('dev'));
//app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: true,
	limit: "20mb"
}));
app.use(bodyParser.json({ limit: "20mb" }));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// required for passport
app.use(session({
	secret: 'my_express_app_idea',
    saveUninitialized: false,
	resave: false,
    name: "em.sid",
    store: new mongoStore({
		mongooseConnection: mongoose.connection,
        touchAfter: 24 * 3600, //1 day in seconds
        secret: 'my_express_app_idea_session',
		//Not needed as maxAge is set
        //ttl: (7 * 24 * 60 * 60) //7 days, no need cookie maxAge is this is set, also need this as session cookie has no expiry
	}),
	cookie: {
		path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 day in milliseconds
        httpOnly: true,
    	sameSite: true
	}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next){
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use('/public', express.static("server/public"));

//-------Routes---------//
initRoutes(app, passport);

// Catch no route match, always at the end
app.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname,'../client/index.html'));
});

//-------Launch---------//
app.listen(8081, () => {
	console.log('Express App server listening on post ' + 8081);
});

// function connect() {
//   const options = { server: { socketOptions: { keepAlive: 1 } } };
//   const db = mongoose.connect(server.mongoUri, options).connection;
//   db.on("error", (err) => logger.error(err));
//   db.on("open", () => logger.connected(server.mongoUri));
//   return db;
// }