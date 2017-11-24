'use strict'

var express = require('express');
var AlbercaController = require('../controllers/albercas');

var api = express.Router();
var md_auth= require('../middleware/authenticated');
var md_admin = require('../middleware/is_admin');

//para subir imagenes
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/albercas'})

//mis direcciones
api.get('/pruebas-albercas', md_auth.ensureAuth, AlbercaController.pruebas);
api.post('/add_alberca',md_auth.ensureAuth, AlbercaController.saveAlberca);
api.get('/listar_albercas/:id',md_auth.ensureAuth,AlbercaController.getAlbercas)
api.get('/obtener_alberca/:id',md_auth.ensureAuth,AlbercaController.getAlberca)
api.put('/update_alberca/:id',md_auth.ensureAuth,AlbercaController.updateAlberca);
api.post('/upload_image_alberca/:id', [md_auth.ensureAuth, md_upload], AlbercaController.uploadsImage);
api.get('/get-image-alberca/:imageFile', AlbercaController.getImageFile);
api.delete('/delete_alberca/:id',md_auth.ensureAuth,AlbercaController.deleteAlberca);
module.exports = api;