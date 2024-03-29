const path 					= require('path');
const express 				= require('express');
const app 					= express();
const helmet 				= require('helmet');
const compression 			= require('compression');
const morgan       			= require('morgan');
const cookieParser 			= require('cookie-parser');
const bodyParser 			= require('body-parser');
const session      			= require('express-session');
const mongoStore 			= require('connect-mongo');
const flash    				= require('connect-flash');
const passport 				= require('passport');
const initPassport			= require("./passport");
const initRoutes			= require("./routes");
const mongoose 				= require('mongoose');
const favicon               = require('serve-favicon');
const port 					= process.env.PORT || 8080;
const config 				= require('./config/config');
const { handleError }       = require('./utils/error');

//-------Configurations---------//
const options = {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
};
const uri = `mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;

mongoose.connect(uri,options, err => {
    if (err){
    console.error('MongoDB error: %s', err);
       return;
    }
	console.log("MongoDB: Connected to the DB Succesfully.");
});
mongoose.connection.on('disconnected', function() {
    console.error('MongoDB error: Mongo Server is not connected');
});

initPassport(passport);

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
// app.set('trust proxy', 1); // trust first proxy
app.enable('trust proxy');
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    name: process.env.SESSION_NAME,
    store: mongoStore.create({
        mongooseConnection: mongoose.connection,
        touchAfter: 24 * 3600, //1 day in seconds
        secret: process.env.SESSION_STORE_SECRET,
        //ttl: (7 * 24 * 60 * 60) //7 days, no need cookie maxAge is this is set, also need this as session cookie has no expiry
    }),
    proxy: true,
    cookie: {
        path: "/",
        maxAge: (7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: "none"
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

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.png')));
//-------Routes---------//
initRoutes(app, passport);

app.use((error, req, res, next) => {
    handleError(error, res);
});

// Catch no route match, always at the end
app.get('*', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'public/dist', 'index.html'));
});

//-------Launch---------//
app.listen(port, () => {
    console.log('Express App server listening on post ' + port);
});

//-------Handle Uncaught Exceptions---------//
function reportError(err, cb) {
    console.error(err);
    cb();
}
function shutDownGracefully(err, cb) {
    //TODO: Quit accepting connections, clearing all resources
    // server.close(function (){
    //    reportError(err, cb);
    // });
    reportError(err, cb);
}
process
    .on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
        throw new Error('Unhandled Rejection');
    })
    .on('uncaughtException', err => {

        shutDownGracefully(err, function () {
            process.exit(1);
        });
    });