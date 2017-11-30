'use strict'

var express = require('express');
var DatosController = require('../controllers/datos');

var api = express.Router();
var md_auth= require('../middleware/authenticated');
var md_admin = require('../middleware/is_admin');

//para subir imagenes
var multipart = require('connect-multiparty');

api.post('/saveDatos/:id',DatosController.tomarDato);
api.get('/getRegistro/:id',DatosController.getRegistro);

module.exports = api;