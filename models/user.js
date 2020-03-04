// let mongoose = require('mongoose');
// let passportLocalMongoose = require('passport-local-mongoose')
//
// let userSchema = new mongoose.Schema({
//     username: String,
//     password: String
// });
//
// // userSchema.plugin(passportLocalMongoose);
//
// module.exports = mongoose.model('User', userSchema);

var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);