//modelo de la coleccion de socios
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//definir schema
var SocioSchema = Schema({
    Usu_Nombre : String,
    Usu_Apellido_M : String,
    Usu_Apellido_P : String,
    Usu_Telefono : String,
    Usu_Email : String,
    Usu_Role : String,
    Usu_Estado : Boolean,
    Usu_Password : String,
    Usu_Image: String,
    user:{type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Socio',SocioSchema);//entidad