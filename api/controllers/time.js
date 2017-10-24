//GET    /time                  - returns the list of all times
//POST   /time                  - creates a new time with data specified in the request body
//GET    /time/{:id}            - returns a time with the given id
//GET    /time/{:id}/{:user_id} - returns all time for the user
//PUT    /time/{:id}            - updates a time by id with data specified in the request body
//DELETE /time/{:id}            - removes a time by id

'use strict'
var Time = require('../models/time');

function index(req, res){

}

function show(req, res){

}

function store(req, res){

}

module.exports = {
    index,
    store,
    show
}