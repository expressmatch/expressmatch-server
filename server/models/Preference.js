"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PreferenceSchema = new mongoose.Schema({
    currentCity: {
        type: Boolean,
        default: false
    },
    homeTown: {
        type: Boolean,
        default: false
    },
    motherTongue: {
        type: Boolean,
        default: false
    },
    religion: {
        type: Boolean,
        default: false
    },
    caste: {
        type: Boolean,
        default: false
    },
    subCaste: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

PreferenceSchema.pre('find', function() {
    this._startTime = Date.now();
});

PreferenceSchema.post('find', function() {
    if (this._startTime != null) {
        console.log('TIME: preference.find: in MS: ', Date.now() - this._startTime);
    }
});

PreferenceSchema.index({
    "user": 1
});

module.exports = mongoose.model("Preference", PreferenceSchema);
