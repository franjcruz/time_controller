'use strict'

var mongoose = require('mongoose');
var app = require('./api/app');

// TODO env
var port = process.env.PORT || 3339;
var mongoDB = 'mongodb://localhost:27017/time_controller';

//mongoose.connect(mongoDB, (err, res) => {
//    if(err){
//        throw err;
//    }else{
//        console.log('Connect to mongodb');
//    }
//});

//Get the default connection
//var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(port, function(){
    console.log('API listening on '+port);
});
