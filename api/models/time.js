//Require Mongoose
var mongoose = require('mongoose')

// Define schema
var Schema = mongoose.Schema;

var TimeSchema = new Schema({
    user: String,
    time: Date
});

// Compile model from schema
var TimeModel = mongoose.model('Time', TimeSchema );

module.exports = TimeModel;