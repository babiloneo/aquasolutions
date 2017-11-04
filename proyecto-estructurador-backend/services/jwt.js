'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_aquasolutions';
exports.createToken = function(user){
	var payload = {
		sub:user._id,
		name:user.Usu_Nombre,
		lastnam:user.Usu_Apellido_P,
		email:user.Usu_Email,
		role:user.Usu_Role,
		image:user.Usu_Image,
		iat:moment().unix(),
		exp:moment().add(30,'days').unix
	};

	return jwt.encode(payload,secret);
}