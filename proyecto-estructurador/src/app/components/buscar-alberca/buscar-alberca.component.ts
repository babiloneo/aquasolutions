import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

import { Router,ActivatedRoute,Params} from '@angular/router';
import { GLOBAL } from '../../services/global';
import { Alberca } from '../../models/alberca'; 
import { AlbercaService } from '../../services/alberca.services';
import { UserService } from '../../services/user.services';
import { UploadService } from '../../services/upload.services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


import { ChangeDetectorRef, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
	selector:'buscar-alberca',
	templateUrl:'./buscar-alberca.component.html',
	styleUrls:['./buscar-alberca.component.css','../../stilo/bootstrap.css'],
	providers:[AlbercaService,UserService]

})

export class BucarAlbercaComponent implements OnInit {
	
	public title: string;
	public alberca:Alberca;
	public url;
	public status;
	public message;
	public token;
	public identity;
	public albercas: Alberca[];
	public busqueda;
	modalRef: BsModalRef;
  	subscriptions: Subscription[] = [];
  	messages: string[] = [];

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _albercaService:AlbercaService,
		private _userService:UserService,
		private modalService: BsModalService,
		private changeDetection: ChangeDetectorRef,
		private parent: AppComponent
		){
		this.title="ALBERCAS";
		this.token=this._userService.getToken();
		this.url = GLOBAL.url;
		this.identity=this._userService.getIdentity();
	}

	gohead(){
		this.parent.activeSensor();
	}

	ngOnInit(){
		this.getalbercas();
	}
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getalbercas(){
  	var empresa = this.identity['Usu_Empresa'];
	this._albercaService.getAlbercas(this.token,empresa).subscribe(
		response =>{
			if(!response.albercas){
				//this._router.navigate(['/']);
			}else{
				this.albercas=response.albercas;
			}
		},
		error=>{
			console.log(<any>error);
		}
	);  	
  }
  
  deleteAlberca(id){
  	this._albercaService.deleteAlberca(this.token,id).subscribe(
  		response =>{
  			if(!response.alberca){
  				alert('Error en el servidor');
  			}
  			this.getalbercas();
  		},
  		error =>{
  			alert("Error en el servidor");
  		}
  	);
  }	

  getAlbercaImg(){
  	this._route.params.forEach((params:Params) =>{

  		let id =params['id'];

  	});
  }
}