// "use strict";
//
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
//
// const ProfileSchema = new mongoose.Schema({
//     user: {
//         ref: 'User',
//         type: Schema.Types.ObjectId
//     },
//     name: {
//         type: String,
//         //required: true
//     },
//     age: {
//         type: Number,
//         //required: true
//     },
//     gender: {
//         type: String,
//         //required: true
//     },
//     currentCity: {
//         type: String,
//         //required: true
//     },
//     homeTown: {
//         type: String
//     },
//     motherTongue: {
//         type: String,
//         //required: true
//     },
//     caste: {
//         type: String
//     },
//     subCaste: {
//         type: String
//     },
//     job: {
//         type: String
//     },
//     organization: {
//         type: String
//     },
//     interests: {
//         type: [String]
//     },
//     pagesLiked: {
//         type: [String]
//     },
//     photos: {
//         type: []
//     }
// }, { timestamps: true });
//
// module.exports = mongoose.model("Profile", ProfileSchema);
