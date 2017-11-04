'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

AlbercaSchema({
	Alb_Nombre: String,
	Alb_Capacidad: String,
	Alb_Ubicacion: String,
	Alb_Image:String,
	user:{type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Alberca',AlbercaSchema);