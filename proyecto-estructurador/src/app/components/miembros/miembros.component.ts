import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params} from '@angular/router';
import { GLOBAL } from '../../services/global';
import { Socio } from '../../models/socio'; 
import { User } from '../../models/user';
import { UserService } from '../../services/user.services';
import { SocioService } from '../../services/socio.service';
import { UploadService } from '../../services/upload.services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


import { ChangeDetectorRef, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
	selector:'miembros',
	templateUrl:'./miembros.component.html',
	styleUrls:['./miembros.component.css','../../stilo/bootstrap.css'],
	providers:[SocioService,UploadService,UserService]
})

export class MiembrosComponent implements OnInit{
	
	public title: string;
	public token: string;
	public url;
	public user:User;
	public socio:Socio;
	public socioDelete:Socio;
	public socios:Socio[];
	modalRef: BsModalRef;
  	subscriptions: Subscription[] = [];
  	messages: string[] = [];
	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _socioService:SocioService,
		private _userService:UserService,
		private modalService: BsModalService,
		private changeDetection: ChangeDetectorRef
		){
		this.title="ALBERCAS";
		this.token=this._userService.getToken();
		this.url = GLOBAL.url;
		this.user=this._userService.getIdentity();

	}

	ngOnInit(){
		this.getaSocios();
	}
  	openModal(template: TemplateRef<any>) {
    	this.modalRef = this.modalService.show(template);
  	}

  	getaSocios(){
  		var id = this.user['_id'];
		this._socioService.getSocios(this.token,id).subscribe(
			response =>{
				if(!response.users){
				//this._router.navigate(['/']);
				}else{
					this.socios=response.users;
				}
			},
			error=>{
				console.log(<any>error);
			}
		);  	
  	}


  deleteSocio(socio,id){
  	this.socioDelete=socio;
  	this.socioDelete.Usu_Estado=false;

  	this._socioService.deleteSocios(this.token,id,this.socioDelete).subscribe(
  		response =>{
  			if(!response.user){
  				alert('Error en el servidor');
  			}
  			this.getaSocios();
  		},
  		error =>{
  			alert("Error en el servidor");
  		}
  	);
  }	

/*
  getAlbercaImg(){
  	this._route.params.forEach((params:Params) =>{

  		let id =params['id'];

  		//this._albercaService.getAlbercas(id).se
  	});
  }*/

}