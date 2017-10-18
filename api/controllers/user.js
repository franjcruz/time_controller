'use strict'
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

function index(req, res){
    res.status(200).send({
        message: '22222'
    })
}

function store(req, res){
    var user = new User();
    var params = req.body;
    
    user.email = params.email.toLowerCase();
    user.name = params.name;
    user.avatar = 'null';
    
    if (params.password && user.email){
        bcrypt.hash(params.password, null, null, function(err, hash){
            user.password = hash;
            user.save((err, userStored)=>{
                if(err){
                    res.status(500).send({
                        message: 'Error storing user'
                    })                    
                }else{
                    res.status(200).send({
                        user: userStored
                    });
                }
            });
        })
    }else{
        res.status(200).send({
            message: 'Fill all fields'
        })
    }
}

function login(req, res){
    var params = req.body;
    
    User.findOne({email : params.email.toLowerCase()},(err, user) => {
        if(err){
            res.status(500).send({
                message: 'Error searching user'
            });   
        }else{
            if(user){
                bcrypt.compare(params.password, user.password, function(err,check){
                   if(check){

                   }else{
                       res.status(200).send({
                           user: user
                       });
                   }
                });
            }else{
                res.status(404).send({
                    message: 'User not found'
                });   
            }
        }
    });
}

module.exports = {
    index,
    store,
    login
}