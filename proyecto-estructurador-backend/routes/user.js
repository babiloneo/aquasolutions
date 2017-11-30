'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth= require('../middleware/authenticated');
var md_admin = require('../middleware/is_admin');
//para subir imagenes
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/users'})
//mis direcciones
api.get('/pruebas-del-controlador', md_auth.ensureAuth, UserController.pruebas);
api.post('/register',UserController.saveUser);
api.post('/login',UserController.login);
api.put('/update-user/:id', [md_auth.ensureAuth], UserController.UpdateUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadsImage);
api.get('/get-image-file/:imageFile', UserController.getImageFile);
api.get('/administradores/:empresa',md_auth.ensureAuth,UserController.getAdmin);
api.post('/delete-user/:id',UserController.DeleteUser);
api.get('/getsocios/:id',[md_auth.ensureAuth],UserController.getsocio);
api.post('/getpassword',UserController.getpassword);
api.post('/updatepassword',UserController.updatePassword);
module.exports = api;