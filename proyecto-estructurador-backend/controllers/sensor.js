'use strict'
//modulos
var fs = require('fs'); //ttrabajar con el sistema de fichores
var path = require('path');

//modelos
var Alberca =require('../models/alberca');
var Trigger = require('../models/trigger');
var Sensor = require('../models/sensor');

//acciones
function pruebas(req,res){
	res.status(200).send({
		message:'Probando el controlador de albercas',
		user:req.user
	});
}

//1 : insert
//2: update
//3 :delete 
function triggerSensor(num,myuser,id){

	var trigger = new Trigger();
	trigger.Usuario=myuser;
	trigger.fecha=new Date();
	trigger.coleccion="Sensores";
	trigger.campo=id;
	switch(num){

		case 1:	trigger.movimiento="INSERT";
				break;
		case 2:	trigger.movimiento="UPDATE";
				break;
		case 3: trigger.movimiento="DELETE";
				break;
	}

	trigger.save((err,tri) =>{
		if(err){

		}else{
			if(!tri){
				console.log("no se pudo");
			}else{
				console.log(tri);
			}
		}
	});

}

function saveSensor(req,res){
	var sensor = new Sensor();
	var params = req.body;

	if(params.Sen_Nombre && params.Sen_Descripcion && params.Sen_ip && params.Id_Alberca){
		sensor.Sen_Nombre = params.Sen_Nombre;
		sensor.Sen_Descripcion = params.Sen_Descripcion;
		sensor.Sen_Fecha = new Date();
		sensor.Sen_Image= null;
		sensor.Sen_ip = params.Sen_ip;
		sensor.Sen_Estado = true;
		sensor.Id_Alberca = params.Id_Alberca;

		sensor.save((err,sensorStored) =>{
			if(err){

			}else{
				if(!sensorStored){
					res.status(500).send({message:'Error en el servidor'});
				}else{
					res.status(200).send({sensor:sensorStored});
					triggerSensor(1,req.user.sub,sensor._id,);
				}
			}
		});
	}else{
		res.status(200).send({message:'Introdusca todos los datos corectamente'});
	}
}


function getSensores(req,res){
	var albercaId = req.params.id;

	Sensor.find({Id_Alberca:albercaId,Sen_Estado:true}).exec((err,sensores) =>{
		if(err){
			res.status(500).send({message:'Eror en la peticion'});
		}else{
			if(!sensores){
				res.status(404).send({message:'No hay sensores'})
			}else{
				res.status(200).send({sensores});
			}
		}
	});
}

function getSensor(req,res){

	var sensorId = req.params.id;

	Sensor.findById(sensorId).populate({path:'user'}).exec((err,sensor) =>{
		if(err){
			res.status(500).send({message:'Eror en la peticion'});
		}else{
			if(!sensor){
				res.status(404).send({message:'ID de registro no encontrada'})
			}else{
				res.status(200).send({sensor});
			}
		}
	});
}

function updateSensor(req,res){
	var sensorId=  req.params.id;
	var update = req.body;

	Sensor.findByIdAndUpdate(sensorId,update,{new:true},(err,sensorUpdate) =>{
		if(err){
			res.status(500).send({message:'Error en la peticion'});
		}else{
			if(!sensorUpdate){
				res.status(404).send({message:'No se ha actualizado el sensor'});
			}else{
				res.status(200).send({sensor:sensorUpdate});
				triggerSensor(2,req.user.sub,sensorUpdate._id,);

			}
		}
	});
}

function uploadsImage(req,res){
	var sensorId = req.params.id;
	var file_name = 'No subido...';
if(req.files){
		var file_path = req.files.Sen_Image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

	if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg'){
		
		Sensor.findByIdAndUpdate(sensorId,{Sen_Image:file_name},{new:true},(err,sensorUpdate) =>{
			if(err){
				res.status(500).send({
					message:'Error al actualizar el sensor'
				});
			}else{
				if(!sensorUpdate){
					res.status(404).send({message:'No se ha podido hactualizar la alberca'})
				}else{
					res.status(200).send({sensor:sensorUpdate, Sen_Image:file_name});
				}
			}
		});
		

		}else{
			fs.unlink(file_path, (err)=>{
				if(err){
					res.status(200).send({message:'Extencion no valida y fichero no valido'});	
				}else{
					res.status(200).send({message:'Extencion no valida'});	
				}
			});
		}

	}else{
		res.status(200).send({message:'No se han subido archivos'});
	}
}

function getImageFile(req,res){
	var imageFile = req.params.imageFile;
	var path_file = './uploads/sensores/'+imageFile;

	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(404).send({message:'La imagen no existe'});
		}
	});
}

function deleteSensor(req,res){

	var sensorId=req.params.id;



	Sensor.update({_id:sensorId},{Sen_Estado:false},{new:true},(err,sensorRemoved) =>{
		if(err){
			res.status(500).send({message:'Error en la peticion'});
		}else{
			if(!sensorRemoved){
				res.status(404).send({message:'No se encontro el sensor'});
			}else{
				res.status(200).send({sensor:sensorRemoved});
				triggerSensor(3,req.user.sub,sensorRemoved._id,);
			}
		}
	});

}
module.exports={
	pruebas,
	saveSensor,
	getSensores,
	getSensor,
	updateSensor,
	uploadsImage,
	getImageFile,
	deleteSensor
};