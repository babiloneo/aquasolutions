import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute,Params} from '@angular/router';
import { GLOBAL } from '../../services/global';
import { Alberca } from '../../models/alberca'; 
import { AlbercaService } from '../../services/alberca.services';
import { UserService } from '../../services/user.services';
import { UploadService } from '../../services/upload.services';

@Component({
	selector:'editar-alberca',
	templateUrl:'editar-alberca.component.html',
	styleUrls:['editar-alberca.component.css'],
	providers:[UserService,AlbercaService,UploadService]

})

export class EditarAlbercaComponent implements OnInit{

	public title: string;
	public alberca:Alberca;
	public identity;
	public token;
	public url;
	public status;
	public message;
	public buscarId: string;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService,
		private _albercaService:AlbercaService,
		private _uploadService:UploadService,
		){
		this.title="ALBERCAS";
		this.identity=this._userService.getIdentity();
		this.token=this._userService.getToken();
		this.url=GLOBAL.url;
	}
	ngOnInit(){
		console.log('mi  registro de alberca');
	}

	getALberca(){
		this._albercaService.getAlberca(this.token,this.buscarId).subscribe(
			response =>{
				if(!response){
					this.status="error";
					this.message="ID de registro no encontrada";

				}else{
					this.status="success";
					this.alberca=response.Alberca;
				}
			},
			error =>{
				console.log(<any>error);
				this.status="error";
				this.message="ID de registro no encontrada";
			}
		);
	}

	onSubmit(){
		var id = this.alberca._id;
		this._albercaService.editAlberca(this.token,id,this.alberca).subscribe(
			response =>{
				if(!response.alberca){
					this.status="error";
				}else{
					this.status="successs";
					this.alberca = response.alberca;

					//subir foto alberca
					if(!this.filesToUpload){
						this._router.navigate(['/buscar_alberca']);
					}else{
						this._uploadService.makeFileRequest(this.url+'upload_image_alberca/'+this.alberca._id,[],this.filesToUpload,this.token,'Alb_Image')
					   .then((result: any) =>{
					   	this.alberca.Alb_Image = result.Alb_Image;
						this._router.navigate(['/buscar_alberca']);

					   });
					}
				}
			},
			error =>{
				var errorMessage =<any>error;
				if(errorMessage !=null){
					this.status="error";
				}
			}
		);
	}

	public filesToUpload: Array<File>;
	fileChangeEvent(fileInput:any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	limpiarForm(registerAlbercaForm,buscarAlbercaForm){
		registerAlbercaForm.reset();
		this.status='success';
		this.buscarId="";		
		buscarAlbercaForm.reset();
	}

}