'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');

//modelos
var User = require('../models/user');
var Socio = require('../models/socio');
var Trigger = require('../models/trigger');


var fs = require('fs'); //ttrabajar con el sistema de fichores
var path = require('path');

 //servicio jwt
 var jwt = require('../services/jwt');

function triggerSocio(num,myuser,id){

	var trigger = new Trigger();
	trigger.Usuario=myuser;
	trigger.fecha=new Date();
	trigger.coleccion="Socios";
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
				console.log("No se puedo ejecutar el trigger");
			}else{
				console.log("Trigger ejecutado exitosamente");
			}
		}
	});

}


function saveUser(req,res){
	//crear el objecto del usuario
	var socio = new Socio();

	//Recoger parametro peticion
	var params = req.body;
	//asignar valores al usuario

	if(params.Usu_Nombre && params.Usu_Apellido_M && params.Usu_Apellido_P){
		socio.Usu_Nombre = params.Usu_Nombre;
		socio.Usu_Apellido_M = params.Usu_Apellido_M;
		socio.Usu_Apellido_P = params.Usu_Apellido_P;
		socio.Usu_Telefono = params.Usu_Telefono;
		socio.Usu_Email = params.Usu_Email;
		socio.Usu_Role = params.Usu_Role;
		socio.Usu_Estado = params.Usu_Estado;
		socio.Usu_Password = params.Usu_Password;
		socio.Usu_Image = null;	
		socio.user=req.user.sub;

		Socio.findOne({Usu_Email:socio.Usu_Email.toLowerCase()}, (err,issetUser)=>{
			if(err){
				res.status(500).send({message:'Error al comprobar que el usuario existe'});
			}else{
				if(!issetUser){
					//Ciframos contrasena
					bcrypt.hash(params.Usu_Password, null , null , function(err,hash){
						socio.Usu_Password = hash;

						//guardo usuario en base de datos
						socio.save((err,userStored) => {
							if(err){
								res.status(500).send({message:'Error al Guardar el Usuario,Intentelo mas tarde'});
							}else{
								if(!userStored){
									res.status(404).send({message:'No se ha registrado el usuario'});
								}else{
									res.status(200).send({socio: userStored});
									triggerSocio(1,req.user.sub,userStored._id,);

								}
							}
						});
					});

				}else{
					res.status(200).send({
						message: 'Este correo ya se encuentra registrado'
					});
				}
			}
		});
	
	}else{
		res.status(200).send({
			message:'Introduce los datos correctamente para registrar al usuario',
		});	
	}

}

function UpdateUser(req,res){
	var userId = req.params.id;
	var update = req.body;

		Socio.findByIdAndUpdate(userId,update,{new:true},(err,userUpdate) =>{
			if(err){
				res.status(500).send({
					message:'Error al actualizar el usuario'
				});
			}else{
				if(!userUpdate){
					res.status(404).send({message:'No se ha podido hactualizar el usuario'})
				}else{
					res.status(200).send({user:userUpdate});
					triggerSocio(2,req.user.sub,userUpdate._id,);

				}
			}
		});
	
}

function DeleteUser(req,res){
	var userId = req.params.id;
	var update = req.body;

	Socio.findByIdAndUpdate(userId,update,{new:true},(err,userUpdate) =>{
		if(err){
			res.status(500).send({
				message:'Error al actualizar el usuario'
			});
		}else{
			if(!userUpdate){
				res.status(404).send({message:'No se ha podido hactualizar el usuario'})
			}else{
				res.status(200).send({user:userUpdate});
			    triggerSocio(3,userUpdate.user,userUpdate._id,);

			}
		}
	});
}


function uploadsImage(req,res){
	var albercaId = req.params.id;
	var file_name = 'No subido...';
		console.log('mifile: '+req.files);

if(req.files){
		var file_path = req.files.Usu_Image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

	if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg'){
		
		Socio.findByIdAndUpdate(albercaId,{Usu_Image:file_name},{new:true},(err,usurioUpdate) =>{
			if(err){
				res.status(500).send({
					message:'Error al actualizar la alberca'
				});
			}else{
				if(!usurioUpdate){
					res.status(404).send({message:'No se ha podido hactualizar la alberca'})
				}else{
					res.status(200).send({user:usurioUpdate, Usu_Image:file_name});
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
	var path_file = './uploads/socio/'+imageFile;

	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(404).send({message:'La imagen no existe'});
		}
	});
}

function getSocios(req,res){
	var id = req.params.id;

	Socio.find({Usu_Estado:'true',user:id}).exec((err,users) =>{
		if(err){
			res.status(500).send({message:'Error en la peticion'});
		}else{
			if(!users){
				res.status(404).send({message:'No hay cuidadores'});
			}else{
				res.status(200).send({users});
			}
		}
	});
}

function getsocio(req,res){
	var socioId = req.params.id;

	Socio.findById(socioId).populate({path:'user'}).exec((err,getSocio) =>{
		if(err){
			res.status(500).send({message:'Eror en la peticion'});
		}else{
			if(!getSocio){
				res.status(404).send({message:'ID de registro no encontrada'})
			}else{
				res.status(200).send({socio:getSocio});
			}
		}
	});
}

module.exports = {
	saveUser,
	UpdateUser,
	uploadsImage,
	getImageFile,
	DeleteUser,
	getSocios,
	getsocio
};