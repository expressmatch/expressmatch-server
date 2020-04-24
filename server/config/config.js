const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

const config = {
    DELAY: 0,

    DB_HOST: 'localhost',
    DB_PORT: '27017',
    DB_USER: null,
    DB_PASS: null,

    NOREPLY_GMAILUN: process.env.NOREPLY_GMAILUN,
    NOREPLY_GMAILPW: process.env.NOREPLY_GMAILPW,
    ADMIN_GMAILUN: process.env.ADMIN_GMAILUN,
    ADMIN_GMAILPW: process.env.ADMIN_GMAILPW,

    AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
    AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,

    // Express App
    // 'facebookAuth' : {
    //     'clientID'      : '1903191953042147', // your App ID
    //     'clientSecret'  : '5cca17782e72b62a68f7420010ec7484', // your App Secret
    //     'callbackURL'   : 'http://expresstomatch.com/auth/facebook/callback',
    //     'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
    //     'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    // },
    // Express - Test App
    facebookAuth : {
        clientID      : process.env.fb_auth_clientID,
        clientSecret  : process.env.fb_auth_clientSecret,
        callbackURL   : process.env.fb_auth_callbackURL,
        profileURL    : process.env.fb_auth_profileURL,
        profileFields : process.env.fb_auth_profileFields.split(',')
    }
};

module.exports = config;