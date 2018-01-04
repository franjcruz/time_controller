'use strict'

var express = require('express');
var timeController = require('../controllers/time');
var api = express.Router();

api.get('/time', timeController.index);
api.get('/time/:user', timeController.show);
api.get('/time/:user/:day', timeController.dayTime);  // Day must have this format: 20180103
api.post('/time', timeController.store);

module.exports = api;