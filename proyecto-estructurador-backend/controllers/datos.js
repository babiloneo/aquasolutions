'use strict'
//modulos
var fs = require('fs'); //ttrabajar con el sistema de fichores
var path = require('path');

//modelos
var Sensor = require('../models/sensor');
var Datos = require('../models/datos');

//acciones
function tomarDato(req,res){
	var params = req.body;
	var datos = new Datos();
	datos.registro=params.registro;
	datos.fecha=new Date();
	datos.hora=new Date();
	datos.Id_Sensor=req.params.id;

		datos.save((err,registro) =>{
			if(err){
				res.status(500).send({message:'Error en el servidor'});
			}else{
				if(!registro){
					res.status(500).send({message:'Error al guardar registro'});
				}else{
					res.status(200).send({sensor:registro});
				}
			}
		});
}

function getRegistro(req,res){
	var datos = new Datos();
	var idSensor=req.params.id;
	Datos.find({Id_Sensor:idSensor}).sort({_id:-1}).limit(1).exec((err,registro) =>{
		if(err){
			res.status(500).send({message:"Error en el servidor"});
		}else{
			if(!registro){
				res.status(404).send({message:"No hay registros"});
			}else{
				res.status(200).send({registro:registro});
			}
		}
	});
}

module.exports={
	tomarDato,
	getRegistro
};