//Require Mongoose
var mongoose = require('mongoose')

// Define schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    name: String,
    avatar: String
});

// Compile model from schema
var UserModel = mongoose.model('User', UserSchema );

module.exports = UserModel;