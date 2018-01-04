//GET    /time                  - returns the list of all times
//POST   /time                  - creates a new time with data specified in the request body
//GET    /time/{:id}            - returns a time with the given id
//GET    /time/{:user_id}       - returns all time for one user
//PUT    /time/{:id}            - updates a time by id with data specified in the request body
//DELETE /time/{:id}            - removes a time by id

'use strict'
var Time = require('../models/time');
var moment = require('moment');

function index(req, res){
    Time.find(function(err, time) {
        if(err) res.send(500, err.message);
        res.status(200).jsonp(time);
    });
}

function show(req, res){
    Time.find({user:req.params.user},function(err, time) {
        if(err) res.send(500, err.message);
        res.status(200).jsonp(time);
    });
}

function store(req, res){
    var time = new Time();
    var params = req.body;
    
    if (params.user){
        time.user = params.user;
        time.time = moment().unix();
        time.save((err, timeStored)=>{
            if(err){
                res.status(500).send({
                    message: 'Error storing time'
                })                    
            }else{
                res.status(200).send({
                    user: timeStored
                });
            }
        });
    }else{
        res.status(200).send({
            message: 'Please, fill user field'
        })
    }
}

function dayTime(req, res){
    var day = req.params.day;
    var today = moment(day, "YYYYMMDD").unix();
    var tomorrow = moment(day, "YYYYMMDD").add(1,'d').unix();
    console.log(today, tomorrow);

    Time.find({
        user:req.params.user,
        time: { $gt: today, $lt: tomorrow},
    },function(err, results) {
        if(err) res.send(500, err.message);
        res.status(200).jsonp(results);
    });
}

module.exports = {
    index,
    store,
    show,
    dayTime
}