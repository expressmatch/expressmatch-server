"use strict";

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  local: {
    email: {
      type: String,
      //unique: true, Cannot be used in exclusion with facebook
      trim: true
    },
    password: {
      type: String
    },
  },
  facebook: {
    id: {
      type: String,
      //unique: true
    },
    username: {
      type: String
    },
    gender: {
      type: String
    },
    name: {
      type: String
    },
    token: {
      type: String
    },
    email: {
      type: String
    },
    photos: {
      type: [{ value: String}]
    },
    // photo: {
    //   type: String
    // }
  },
    profile: {
        // age: {
        //     type: Number,
        //     //required: true
        // },
        about: {
          type: String
        },
        dob: {
            type: String,
            //required: true
        },
        gender: {
            type: String,
            //required: true
        },
        currentCity: {
            type: String,
            //required: true
        },
        homeTown: {
            type: String
        },
        motherTongue: {
            type: String,
            //required: true
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
        }
    }
}, { timestamps: true });

// UserSchema.statics.authenticate = function (username, password, callback) {

//  User.findOne({ username: username })
//    .exec((error, user) => {
//      if (error) {
//        return callback(error);
//      }
//      if (!user) {
//        let error = new Error("User not found");
//        error.status = 401;
//        return callback(error);
//      }

//      bcrypt.compare(password, user.password, function (error, match) {
//        if (match) {
//          return callback(null, user);
//        } else if (error) {
//          return next(error);
//        } else {
//          let error = new Error("Credentials don't match");
//          error.status = 401;
//          return callback(error);
//        }
//      });
//    });
// };

// UserSchema.pre("save", function (next) {

//  const user = this;
//  if (!user.isModified("password")) {
//    return next();
//  }
//  bcrypt.genSalt(10, function (error, salt) {
//    bcrypt.hash(user.password, salt, function (error, hash) {
//      if (error) {
//        return next(error);
//      }
//      user.password = hash;
//      next();
//    });
//  });
// });

// methods ======================
// generating a hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User", UserSchema);
