'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema();

var MantenimientoSchema({
	Man_Descripcion: String,
	Man_fecha: date(),
	man_hora:time(),
	Id_Alberca:{ type:Schema.ObjectId, ref: 'Alberca'}
});

module.exports = mongoose.model('Mantenimiento');