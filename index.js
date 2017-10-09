'use strict'

var mongoose = require('mongoose');
var app = require('./api/app');
var port = process.env.PORT || 3333;

//mongoose.connect('mongodb://localhost:27017/time_controller', (err, res) => {
//    if(err){
//        throw err;
//    }else{
//        console.log('Connect to mongodb');
//    }
//});

app.listen(port, function(){
    console.log('API listening on '+port);
});
