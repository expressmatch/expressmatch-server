"use strict";

const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    userId: {
        type: Object._id,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    currentCity: {
        type: String,
        required: true
    },
    homeTown: {
        type: String
    },
    motherTongue: {
        type: String,
        required: true
    },
    caste: {
        type: String
    },
    subCaste: {
        type: String
    },
    job: {
        type: String
    },
    organization: {
        type: String
    },
    interests: {
        type: [String]
    },
    pagesLiked: {
        type: [String]
    }
});

module.exports = mongoose.model("Profile", ProfileSchema);
