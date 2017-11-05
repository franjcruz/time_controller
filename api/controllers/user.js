'use strict'
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

function index(req, res){
    res.status(200).send({
        message: '22222'
    })
}

function store(req, res){
    var user = new User();
    var params = req.body;
    
    if (params.email && params.password){
        user.email = params.email.toLowerCase();
        user.name = params.name;
        user.avatar = 'null';
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
                bcrypt.compare(params.password, user.password, function(err, check){
                    if(check){
                        //Log
                        res.status(200).send({
//                           user: user
                            token: jwt.createToken(user)
                        });
                    }else{
                        res.status(404).send({
                            message: 'Password error'
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

function verifyPassword(pass, string) {
    console.log(pass, string);
    bcrypt.compare(pass, string, function(err,check){
        console.log("dentro", check);
        if(check){
            return true;
        }
    });
    return false;
}

module.exports = {
    index,
    store,
    login,
    verifyPassword
}