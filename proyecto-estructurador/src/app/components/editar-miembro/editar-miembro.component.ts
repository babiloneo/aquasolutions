import { Component,OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Socio }  from '../../models/socio';
import { User }  from '../../models/user';

import { GLOBAL } from '../../services/global';
import { SocioService } from '../../services/socio.service';
import { UserService } from '../../services/user.services';
import { UploadService } from '../../services/upload.services';

@Component({
	selector:'edit-miembro',
	templateUrl:'./editar-miembro.component.html',
	styleUrls:['./editar-miembro.component.css'],
	providers:[SocioService,UploadService,UserService]

})

export class EditarMiembroComponent implements OnInit {
	
	public title: string;
	public socio: User;
	public identity;
	public token;
	public status;
	public url: string;
	public buscarId;
	public message: string;
	constructor(
		private _socioService:SocioService,
		private _uploadService:UploadService,
		private _userService:UserService,
		private _router:Router,

	){
		this.title ='Actualizar socio';
		//this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
	}

	ngOnInit(){
		console.log('editar miembro cargado');
	}

	getSocio(){
		this._userService.getSocio(this.token,this.buscarId).subscribe(
			response =>{
				if(!response.socio){
					this.message="ID de registro no encontrada";
					this.status="error";
					alert('if response');

				}else{
					this.status="success";
					this.socio=response.socio;
				}
			},
			error =>{
				this.message="ID de registro no encontrada";				
				this.status="error";
				console.log(<any>error);

			}
		);
	}

	updateSocio(){
		//realizo la peticion a actualiza mi usuario
		this._userService.updateUser(this.socio).subscribe(
			response =>{
				//si no me devuelve un usuario mando error
				if(!response.user){
					this.status = 'error'
				}else{
					//si me devuelve el usuario actualizado actualizo el identity local
					this.status= 'success';
					
					this._uploadService.makeFileRequest(this.url+'upload-image-user/'+this.buscarId,[],this.filesToUpload,this.token,'image')
									   .then((result: any) =>{
									   	//this.socio = result.user;
									   	this._router.navigate(['/miembros']);

									   });
				}
			},
			error =>{
				var errorMessage = <any>error;
				if(errorMessage!=null){
					this.status = 'error';
				}
			}
			);
	}

	//metodo para capturar los ficheros que seleccionemos en el imput de file
	//para las imagenes de susuario
	public filesToUpload: Array<File>;
	fileChangeEvent(fileInput:any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	limpiarForm(registerUserForm){
		registerUserForm.reset();
		this.status='success';			 			
	}


}