'use strict'

require('dotenv').config();
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = process.env.SECRET;

exports.createToken = function(user){
    var payload = {
        email: user.email,
        sub: user._id,
        it: moment().unix(),
        exp: moment().add(1,'h').unix()
    }
    return jwt.encode(payload, secret);
};