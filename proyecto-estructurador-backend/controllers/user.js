'use strict'
//modulos
var bcrypt = require('bcrypt-nodejs');

//modelos
var User = require('../models/user');
var fs = require('fs'); //ttrabajar con el sistema de fichores
var path = require('path');

 //servicio jwt
 var jwt = require('../services/jwt');

//acciones
function pruebas(req,res){
	res.status(200).send({
		message:'Probando el controlador de usuarios',
		user:req.user
	});
}

function saveUser(req,res){
	//crear el objecto del usuario
	var user = new User();

	//Recoger parametro peticion
	var params = req.body;
	//asignar valores al usuario

	if(params.nombre && params.materno && params.paterno && params.telefono && params.email && params.role && params.password && params.empresa){
		user.Usu_Nombre = params.nombre;
		user.Usu_Apellido_M = params.materno;
		user.Usu_Apellido_P = params.paterno;
		user.Usu_Telefono = params.telefono;
		user.Usu_Email = params.email;
		user.Usu_Role = params.role;
		user.Usu_Estado = params.estado;
		user.Usu_Password = params.password;
		user.Usu_Image = null;	
		user.Usu_Empresa=params.empresa;

		User.findOne({Usu_Email:user.Usu_Email.toLowerCase()}, (err,issetUser)=>{
			if(err){
				res.status(500).send({message:'Error al comprobar que el usuario existe'});
			}else{
				if(!issetUser){
					//Ciframos contrasena
					bcrypt.hash(params.password, null , null , function(err,hash){
						user.Usu_Password = hash;

						//guardo usuario en base de datos
						user.save((err,userStored) => {
							if(err){
								res.status(500).send({message:'Error al Guardar el Usuario,Intentelo mas tarde'});
							}else{
								if(!userStored){
									res.status(404).send({message:'No se ha registrado el usuario'});
								}else{
									res.status(200).send({user: userStored});
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

function getpassword(req,res){
	var params = req.body;

	var email = params.email;
	var confi = params.telefono;
	
	User.findOne({Usu_Email:email.toLowerCase()},(err,user)=>{
		if(err){
			res.status(500).send({message:"Error en el servidor"});
		}else{
			if(!user){
				res.status(404).send({message:"No se encontro el usuario"})
			}else{
				var str = user._id;
				var count = str.length;
				var cmp = str.substring((count-4),count);
				console.log("1: "+confi+" "+cmp);
				if(confi==cmp){
					res.status(200).send({estado:1});
				}else{
					res.status(200).send({estado:0});
				}
			}
		}
	});
}


function updatePassword(req,res){
	var params = req.body;

	var email = params.email;
	var password = params.password;
	bcrypt.hash(password, null , null , function(err,hash){
		//user.Usu_Password = hash;

		User.update({Usu_Email:email},{Usu_Password:hash},{new:true},(err,updatepassword) =>{
			if(err){
				res.status(500).send({message:'Error en la peticion'});
			}else{
				if(!updatepassword){
					res.status(404).send({message:'No se encontro el sensor'});
				}else{
					res.status(200).send({password:updatepassword});
					//triggerSensor(3,req.user.sub,sensorRemoved._id,);
				}
			}
		});
	});
}

function login(req,res){

	var params = req.body;

	var email = params.email;
	var pass = params.password;

	User.findOne({Usu_Email:email.toLowerCase()}, (err,user)=>{
		if(err){
			res.status(500).send({message:'El al intentar loguearse'});
		}else{
			if(user){

				bcrypt.compare(pass,user.Usu_Password, function(err,check){

					if(check){
						//comprobar y generar token
						if(params.gettoken){
							//devolver token
							res.status(200).send({
								token: jwt.createToken(user)
							});

						}else{
							res.status(200).send({user});
						}
					}else{
						res.status(200).send({
							message:'La contraseña es incorrecta',

						});
					}
				});

			}else{
				res.status(200).send({
					message: 'El usuario no existe'
				});
			}
		} 
	});
}

function UpdateUser(req,res){
	var userId = req.params.id;
	var update = req.body;


		User.findByIdAndUpdate(userId,update,{new:true},(err,userUpdate) =>{
			if(err){
				res.status(500).send({
					message:'Error al actualizar el usuario'
				});
			}else{
				if(!userUpdate){
					res.status(404).send({message:'No se ha podido hactualizar el usuario'})
				}else{
					res.status(200).send({user:userUpdate});
				}
			}
		});
	
}

function getsocio(req,res){
	var socioId = req.params.id;

	User.findById(socioId).populate({path:'user'}).exec((err,getSocio) =>{
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


function uploadsImage(req,res){
	var userId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

	if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg'){
		
			User.findByIdAndUpdate(userId,{Usu_Image:file_name},{new:true},(err,userUpdate) =>{
				if(err){
					res.status(500).send({
						message:'Error al actualizar el usuario'
					});
				}else{
					if(!userUpdate){
						res.status(404).send({message:'No se ha podido hactualizar el usuario'})
					}else{
						res.status(200).send({user:userUpdate, Usu_Image:file_name});
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
	var path_file = './uploads/users/'+imageFile;

	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(404).send({message:'La imagen no existe'});
		}
	});
}

function getAdmin(req,res){
		var empresa = req.params.empresa;

	User.find({Usu_Estado:'true',Usu_Role:'socio',Usu_Empresa:empresa}).exec((err,users) =>{
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

function DeleteUser(req,res){
	var userId = req.params.id;
	var update = req.body;

	User.findByIdAndUpdate(userId,update,{new:true},(err,userUpdate) =>{
		if(err){
			res.status(500).send({
				message:'Error al actualizar el usuario'
			});
		}else{
			if(!userUpdate){
				res.status(404).send({message:'No se ha podido hactualizar el usuario'})
			}else{
				res.status(200).send({user:userUpdate});
			    //triggerSocio(3,userUpdate.user,userUpdate._id,);

			}
		}
	});
}

module.exports = {
	pruebas,
	saveUser,
	login,
	UpdateUser,
	uploadsImage,
	getImageFile,
	getAdmin,
	DeleteUser,
	getsocio,
	getpassword,
	updatePassword
};