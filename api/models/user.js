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

UserSchema.methods.hashPassword = function() {
    bcrypt.hash(this.password, null, null, function(err, hash){
        this.password = hash;
    })
};

UserSchema.methods.verifyPassword = function(pass) {
    bcrypt.compare(this.password, pass, function(err,check){
       if(check){
           return true;
       }
    });
    return false;
};

// Compile model from schema
var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;