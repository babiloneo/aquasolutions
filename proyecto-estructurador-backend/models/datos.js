'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DatosSchema = Schema({
	registro:String,
	fecha: String,
	hora: String,
	Id_Sensor:{ type: Schema.ObjectId, ref: 'Sensor'}
});

module.exports = mongoose.model('Dato',DatosSchema);