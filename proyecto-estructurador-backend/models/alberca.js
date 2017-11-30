'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbercaSchema = Schema({
	Alb_Nombre: String,
	Alb_Capacidad: String,
	Alb_Ubicacion: String,
	Alb_Image:String,
	Alb_Empresa:String,
	Alb_Estado:String,
	user:{type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Alberca',AlbercaSchema);