'use strict'
//conexion a a DB mongo usando Promise
var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/aquasolutions', {useMongoClient:true})
		.then(()=>{
			console.log("La conexion a la DB aquasolutions se realizo!");
			app.listen(port,() =>{
				console.log("servidor local con node y express esta corriendo");
			});
		})
		.catch(err => console.log(err));