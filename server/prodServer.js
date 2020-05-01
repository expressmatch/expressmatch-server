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
const passport 				= require('passport');
const initPassport			= require("./passport");
const initRoutes			= require("./routes");
const mongoose 				= require('mongoose');
const port 					= process.env.PORT || 8080;
const config 				= require('./config/config');
const { handleError }       = require('./utils/error');

//-------Configurations---------//

//const db = connect();
mongoose.connect(`mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`, {}, () => {
    console.log("DB Connected Succesfully.");
});
mongoose.connection.on('error', function(err) {
    console.error('MongoDB error: %s', err);
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
app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    name: process.env.SESSION_NAME,
    store: new mongoStore({
        mongooseConnection: mongoose.connection,
        touchAfter: 24 * 3600, //1 day in seconds
        secret: process.env.SESSION_STORE_SECRET,
        ttl: (7 * 24 * 60 * 60) //7 days, no need cookie maxAge is this is set, also need this as session cookie has no expiry
    }),
    cookie: {
        path: "/",
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
app.use(express.static("client/dist"));

//-------Routes---------//
initRoutes(app, passport);

// Catch no route match, always at the end
app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname,'views/index.ejs'));
});

app.use((error, req, res, next) => {
    handleError(error, res);
});
//-------Launch---------//
app.listen(port, () => {
    console.log('Express App server listening on post ' + port);
});