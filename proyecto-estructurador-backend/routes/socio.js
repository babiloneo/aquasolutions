'use strict'

var express = require('express');
var SocioController = require('../controllers/socio');

var api = express.Router();
var md_auth= require('../middleware/authenticated');
var md_admin = require('../middleware/is_admin');
//para subir imagenes
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/socio'})
//mis direcciones
//api.get('/pruebas-del-controlador', md_auth.ensureAuth, UserController.pruebas);
api.post('/socio-register', [md_auth.ensureAuth,md_admin.isAdmin],SocioController.saveUser);
//api.post('/login',UserController.login);
//api.put('/update-socio/:id', [md_auth.ensureAuth], SocioController.UpdateUser);
//api.post('/upload-image-socio/:id', [md_auth.ensureAuth, md_upload], SocioController.uploadsImage);
//api.get('/get-image-socio/:imageFile', SocioController.getImageFile);
//api.get('/socios/:id',SocioController.getSocios);
//api.get('/getsocios/:id',[md_auth.ensureAuth],SocioController.getsocio);
//api.post('/delete-user/:id',SocioController.DeleteUser);
module.exports = api;