'use strict'
//modulos
var fs = require('fs'); //ttrabajar con el sistema de fichores
var path = require('path');

//modelos
var User = require('../models/user');
var Alberca =require('../models/alberca');



//acciones
function pruebas(req,res){
	res.status(200).send({
		message:'Probando el controlador de albercas',
		user:req.user
	});
}

function saveAlberca(req,res){
	var alberca = new Alberca();
	var params = req.body;

	if(params.Alb_Nombre && params.Alb_Capacidad && params.Alb_Ubicacion){
		alberca.Alb_Nombre = params.Alb_Nombre;
		alberca.Alb_Capacidad = params.Alb_Capacidad;
		alberca.Alb_Ubicacion = params.Alb_Ubicacion;
		alberca.Alb_Image = null;
		alberca.user = req.user.sub;

		alberca.save((err,albercaStored) =>{
			if(err){

			}else{
				if(!albercaStored){
					res.status(500).send({message:'Error en el servidor'});
				}else{
					res.status(200).send({alberca:albercaStored});
				}
			}
		});
	}else{
		res.status(200).send({message:'Introdusca todos los datos corectamente'});
	}
}


function getAlbercas(req,res){


	Alberca.find({}).populate({path:'user'}).exec((err,albercas) =>{
		if(err){
			res.status(500).send({message:'Eror en la peticion'});
		}else{
			if(!albercas){
				res.status(404).send({message:'No hay albercas'})
			}else{
				res.status(200).send({albercas});
			}
		}
	});
}

function getAlberca(req,res){
	var albercaId = req.params.id;

	Alberca.findById(albercaId).populate({path:'user'}).exec((err,alberca) =>{
		if(err){
			res.status(500).send({message:'Eror en la peticion'});
		}else{
			if(!alberca){
				res.status(404).send({message:'ID de registro no encontrada'})
			}else{
				res.status(200).send({Alberca:alberca});
			}
		}
	});
}

function updateAlberca(req,res){
	var albercaId=  req.params.id;
	var update = req.body;

	Alberca.findByIdAndUpdate(albercaId,update,{new:true},(err,albercaUpdate) =>{
		if(err){
			res.status(500).send({message:'Error en la peticion'});
		}else{
			if(!albercaUpdate){
				res.status(404).send({message:'No se ha actualizado la alberca'});
			}else{
				res.status(200).send({alberca:albercaUpdate});
			}
		}
	});
}

function uploadsImage(req,res){
	var albercaId = req.params.id;
	var file_name = 'No subido...';

if(req.files){
		var file_path = req.files.Alb_Image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

	if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg'){
		
		Alberca.findByIdAndUpdate(albercaId,{Alb_Image:file_name},{new:true},(err,albercaUpdate) =>{
			if(err){
				res.status(500).send({
					message:'Error al actualizar la alberca'
				});
			}else{
				if(!albercaUpdate){
					res.status(404).send({message:'No se ha podido hactualizar la alberca'})
				}else{
					res.status(200).send({user:albercaUpdate, Alb_Image:file_name});
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
	var path_file = './uploads/albercas/'+imageFile;

	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(404).send({message:'La imagen no existe'});
		}
	});
}

function deleteAlberca(req,res){

	var albercaId=req.params.id;

	Alberca.findByIdAndRemove(albercaId,(err,albercaRemoved) =>{

		if(err){
			res.status(500).send({message:'Error en la peticion'});
		}else{
			if(!albercaRemoved){
				res.status(404).send({message:'No se encontro la alberca'});
			}else{
				res.status(200).send({alberca:albercaRemoved})
			}
		}
	});
}
module.exports={
	pruebas,
	saveAlberca,
	getAlbercas,
	getAlberca,
	updateAlberca,
	uploadsImage,
	getImageFile,
	deleteAlberca
};