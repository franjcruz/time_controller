'use strict'

//Require Mongoose
var mongoose = require('mongoose');

var bcrypt = require('bcrypt-nodejs');

// Define schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    password: String,
    name: String,
    avatar: String
});

// Compile model from schema
var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;