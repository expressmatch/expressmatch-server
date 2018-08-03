"use strict";

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  content: {
    type: String
  },
  datecreated: {
    type: Date,
    default: Date.now
  },
  datelastmodified: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  },
  anonymous: {
    type: Boolean
  },
  totalcomments: {
    type: Number,
    default: 0
  },
  totallikes: {
    type: Number,
    default: 0
  },
  totalshares: {
    type: Number,
    default: 0
  },
  tags: {
    type: [String]
  }
});

module.exports = mongoose.model("Post", PostSchema);
