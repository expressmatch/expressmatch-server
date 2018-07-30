const path 					= require('path');
const express 				= require('express');
const app 					= express();
const helmet 				= require('helmet');
const compression 			= require('compression');
const morgan       			= require('morgan');
const cookieParser 			= require('cookie-parser');
const bodyParser 			= require('body-parser');
const session      			= require('express-session');
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
app.use(session({ secret: 'my_express_app_idea' })); 
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//app.use(express.static(path.resolve(__dirname,'../client')));

//-------Routes---------//
const routes = initRoutes(app, passport);
//app.use("/api", routes);	

// Catch no route match, always at the end
app.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname,'../client/index.html'));
});

//-------Launch---------//
app.listen(port, () => {
	console.log('Express App server listening on post ' + port);
});

// function connect() {
//   const options = { server: { socketOptions: { keepAlive: 1 } } };
//   const db = mongoose.connect(server.mongoUri, options).connection;
//   db.on("error", (err) => logger.error(err));
//   db.on("open", () => logger.connected(server.mongoUri));
//   return db;
// }