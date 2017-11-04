'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DatosSchema({
	fecha: String,
	hora: String,
	Id_Sensor:{ type: Schema.ObjectId, ref: 'Sensor'}
});

module.exports = mongoose.module('Dato');