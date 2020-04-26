const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

const config = {
    DELAY: 0,

    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,

    NOREPLY_GMAILUN: process.env.NOREPLY_GMAILUN,
    NOREPLY_GMAILPW: process.env.NOREPLY_GMAILPW,
    ADMIN_GMAILUN: process.env.ADMIN_GMAILUN,
    ADMIN_GMAILPW: process.env.ADMIN_GMAILPW,

    AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
    AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,

    facebookAuth: {
        clientID      : process.env.fb_auth_clientID,
        clientSecret  : process.env.fb_auth_clientSecret,
        callbackURL   : process.env.fb_auth_callbackURL,
        profileURL    : process.env.fb_auth_profileURL,
        profileFields : process.env.fb_auth_profileFields.split(',')
    }
};

module.exports = config;