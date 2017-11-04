'use strict'

exports.isAdmin = function (req,res,next){
	if(req.user.Usu_Role =! 'admin'){
		return res.status(200).send({message:'No tienes acceso a esta zona'});
	}
	next();
}