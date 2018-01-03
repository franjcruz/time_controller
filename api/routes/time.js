'use strict'

var express = require('express');
var timeController = require('../controllers/time');
var api = express.Router();

api.get('/time', timeController.index);
api.get('/time/:user', timeController.show);
api.post('/time', timeController.store);

module.exports = api;