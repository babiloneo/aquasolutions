'use strict'
//modulos
var fs = require('fs'); //ttrabajar con el sistema de fichores
var path = require('path');

//modelos
var User = require('../models/user');
var Trigger = require('../models/trigger');
var Alberca =require('../models/alberca');



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
function triggerAlberca(num,myuser,id){

	var trigger = new Trigger();
	var user = new User();
	trigger.Usuario=myuser;
	trigger.fecha=new Date();
	trigger.coleccion="Albercas";
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

function saveAlberca(req,res){
	var alberca = new Alberca();
	var params = req.body;


	if(params.Alb_Nombre && params.Alb_Capacidad && params.Alb_Ubicacion){
		alberca.Alb_Nombre = params.Alb_Nombre;
		alberca.Alb_Capacidad = params.Alb_Capacidad;
		alberca.Alb_Ubicacion = params.Alb_Ubicacion;
		alberca.Alb_Image = null;
		alberca.Alb_Estado=true;
		alberca.Alb_Empresa = params.Alb_Empresa;
		alberca.user = req.user.sub;

		alberca.save((err,albercaStored) =>{
			if(err){

			}else{
				if(!albercaStored){
					res.status(500).send({message:'Error en el servidor'});
				}else{
					res.status(200).send({alberca:albercaStored});
					triggerAlberca(1,req.user.sub,alberca._id,);
				}
			}
		});
	}else{
		res.status(200).send({message:'Introdusca todos los datos corectamente'});
	}
}


function getAlbercas(req,res){
	var empresa = req.params.empresa;


	Alberca.find({Alb_Estado:true,Alb_Empresa:empresa}).exec((err,albercas) =>{
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
				triggerAlberca(2,req.user.sub,albercaUpdate._id,);
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

	Alberca.update({_id:albercaId},{Alb_Estado:false},{new:true},(err,albercaRemoved) =>{
		if(err){
			res.status(500).send({message:'Error en la peticion'});
		}else{
			if(!albercaRemoved){
				res.status(404).send({message:'No se encontro la alberca'});
			}else{
				res.status(200).send({alberca:albercaRemoved})
				triggerAlberca(3,req.user.sub,albercaRemoved._id,);
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