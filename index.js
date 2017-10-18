'use strict'

var mongoose = require('mongoose');
var app = require('./api/app');
require('dotenv').config();

var port = process.env.PORT || 3339;
var mongoHost = process.env.MONGODB_HOST;
var mongoDB = 'mongodb://'+mongoHost+'/time_controller';
mongoose.Promise = global.Promise;

mongoose.connect(mongoDB, (err, res) => {
    if(err){
        throw err;
    }else{
        console.log('Connect to mongodb');
    }
});

//Get the default connection
//var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(port, function(){
    console.log('API listening on '+port);
});