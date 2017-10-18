'use strict'

var express = require('express');
var userController = require('../controllers/user');
var api = express.Router();

api.get('/user', userController.index);
api.post('/user', userController.store);
api.post('/user/login', userController.login);

module.exports = api;