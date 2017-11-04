'use strict'
var mongoose = require('mongoose');
var Schema =mongoose.Schema();

SensorSchema({
	Sen_Nombre: String,
	Sen_Descripcion: String,
	Sen_Fecha: Date(),
	Sen_Image: String,
	Sen_ip: String,
	Sen_Estado: Boolean,
	Id_Alberca: {type: Schema.ObjectId, ref: 'Alberca'}
});

module.exports = mongoose.model('Sensor');