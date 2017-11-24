'use strict'
//configuracion de servidor con express
var express = require('express');
var bodyParser = require('body-parser');
//cargar framework de express
var app = express();

//cargar rutas
var user_routes=require('./routes/user');
var alberca_routes= require('./routes/albercas');
var sensor_routes=require('./routes/sensor');
var socio_routes=require('./routes/socio');
//middlewares de body-parser,se ejecuta antes que todo
app.use(bodyParser.urlencoded({extended:false}));
// lo que me lleque en una peticion lo convierte a Json
app.use(bodyParser.json());

//configurar cabeceras y cors
app.use((req,res,next) =>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
 	res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
 	res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
 	next();
});

//rutas base
app.use('/api',user_routes);
app.use('/api',alberca_routes);
app.use('/api',sensor_routes);
app.use('/api',socio_routes);
module.exports = app;