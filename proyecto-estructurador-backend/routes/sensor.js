'use strict'

var express = require('express');
var SensorController = require('../controllers/sensor');

var api = express.Router();
var md_auth= require('../middleware/authenticated');
var md_admin = require('../middleware/is_admin');

//para subir imagenes
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/sensores'})

//mis direcciones
api.get('/pruebas-sensor', md_auth.ensureAuth, SensorController.pruebas);
api.post('/add_sensor',md_auth.ensureAuth, SensorController.saveSensor);
api.get('/listar_sensores/:id',md_auth.ensureAuth,SensorController.getSensores);
api.get('/obtener_sensor/:id',md_auth.ensureAuth,SensorController.getSensor);
api.put('/update_sensor/:id',md_auth.ensureAuth,SensorController.updateSensor);
api.post('/upload_image_sensor/:id', [md_auth.ensureAuth, md_upload], SensorController.uploadsImage);
api.get('/get-image-sensor/:imageFile', SensorController.getImageFile);
api.delete('/delete_sensor/:id',md_auth.ensureAuth,SensorController.deleteSensor);
module.exports = api;