import { Component,OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { User }  from '../../models/user';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.services';
import { UploadService } from '../../services/upload.services';

@Component({
	selector:'user-edit',
	templateUrl:'./user-edit.component.html',
	styleUrls:['./user-edit.component.css'],
	providers:[UserService,UploadService]
})

export class UserEditComponent implements OnInit{
	public title: string;
	public user: User;
	public identity;
	public token;
	public status;
	public url: string;
	constructor(

		private _userService:UserService,
		private _uploadService:UploadService
		)
	{
		this.title ='Actualizar mis datos';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.user = this.identity;
		this.url = GLOBAL.url;

	}

	ngOnInit(){
		console.log('Se ha cargado el componente');
	}

	onSubmit(){
		//realizo la peticion a actualiza mi usuario
		this._userService.updateUser(this.user).subscribe(
			response =>{
				//si no me devuelve un usuario mando error
				if(!response.user){
					this.status = 'error'
				}else{
					//si me devuelve el usuario actualizado actualizo el identity local
					this.status= 'success';
					localStorage.setItem('identity',JSON.stringify(this.user));
					
					this._uploadService.makeFileRequest(this.url+'upload-image-user/'+this.user._id,[],this.filesToUpload,this.token,'image')
									   .then((result: any) =>{
									   	this.user = result.user;
				  						localStorage.setItem('identity',JSON.stringify(result.user));

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