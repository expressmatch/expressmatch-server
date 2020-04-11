const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    Bucket: process.env.AWS_S3_BUCKET_NAME
});

const profileImgUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        //acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, 'profile-' + req.user._id.toString() + path.extname(file.originalname))
        }
    }),
    limits: {fileSize: 256000}, // In bytes: 256000 bytes = 256KB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('picture');

function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

module.exports = profileImgUpload;
