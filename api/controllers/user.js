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
    user.password = params.password;
    user.avatar = 'null';
    
    if (user.password && user.email){
        user.hashPassword(function(err) {
            if (err) throw err;
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
        });
    }else{
        res.status(200).send({
            message: 'Please, fill email & password fields'
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
                user.verifyPassword(params.password, function(err, check) {
                    if(check){
                        //Log
                        res.status(200).send({
                           user: user
                        });
                    }else{
                        res.status(404).send({
                            message: 'User not found'
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