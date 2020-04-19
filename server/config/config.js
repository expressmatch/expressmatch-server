const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
    DELAY: 0,

    DB_HOST: 'localhost',
    DB_PORT: '27017',

    NOREPLY_GMAILUN: process.env.NOREPLY_GMAILUN,
    NOREPLY_GMAILPW: process.env.NOREPLY_GMAILPW,
    ADMIN_GMAILUN: process.env.ADMIN_GMAILUN,
    ADMIN_GMAILPW: process.env.ADMIN_GMAILPW,

    AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
    AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME
};

module.exports = config;