import { Component,OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Socio }  from '../../models/socio';
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
	public socio: Socio;
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
		this._socioService.getSocio(this.token,this.buscarId).subscribe(
			response =>{
				if(!response){
					this.status="error";
					this.message="ID de registro no encontrada";

				}else{
					this.status="success";
					this.socio=response.socio;
				}
			},
			error =>{
				console.log(<any>error);
				this.status="error";
				this.message="ID de registro no encontrada";
			}
		);
	}

	updateSocio(){
		//realizo la peticion a actualiza mi usuario
		this._socioService.updateSocio(this.token,this.socio).subscribe(
			response =>{
				//si no me devuelve un usuario mando error
				if(!response.user){
					this.status = 'error'
				}else{
					//si me devuelve el usuario actualizado actualizo el identity local
					this.status= 'success';
					
					this._uploadService.makeFileRequest(this.url+'upload-image-socio/'+this.buscarId,[],this.filesToUpload,this.token,'Usu_Image')
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

}