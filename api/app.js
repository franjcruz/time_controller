'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var userRoutes = require('./routes/user');

app.use('/api', userRoutes);

module.exports = app;