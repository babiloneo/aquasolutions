'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TriggerSchema=Schema({
	Usuario: String,
	fecha: String,
	movimiento:String,
	coleccion: String,
	campo:String
});

module.exports = mongoose.model('Bitacora',TriggerSchema);