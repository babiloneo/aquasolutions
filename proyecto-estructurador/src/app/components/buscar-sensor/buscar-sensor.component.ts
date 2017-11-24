import { Component, OnInit } from '@angular/core';

import { Router,ActivatedRoute,Params} from '@angular/router';
import { GLOBAL } from '../../services/global';
import { Sensor } from '../../models/sensor'; 
import { Alberca } from '../../models/alberca';
import { SensorService } from '../../services/sensor.service';
import { AlbercaService } from '../../services/alberca.services';
import { UserService } from '../../services/user.services';
import { UploadService } from '../../services/upload.services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


import { ChangeDetectorRef, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
@Component({
	selector:'buscar-sensor',
	templateUrl:'./buscar-sensor.component.html',
	styleUrls:['./buscar-sensor.component.css','../../stilo/bootstrap.css'],
	providers:[SensorService,UserService,AlbercaService]

})

export class BuscarSensorComponent  implements OnInit{
	
	public title: string;
	public sensor:Sensor;
	public url;
	public status;
	public message;
	public token;
	public sensores: Sensor[];
	public alberca: Alberca;
	public busqueda;
	public imagenAlb;
	modalRef: BsModalRef;
  	subscriptions: Subscription[] = [];
  	messages: string[] = [];

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _sensorService:SensorService,
		private _userService:UserService,
		private modalService: BsModalService,
		private changeDetection: ChangeDetectorRef,
		private _albercaService: AlbercaService
		){
		this.title="sensor";
		this.token=this._userService.getToken();
		this.url = GLOBAL.url;

	}

	ngOnInit(){
		this.getSensores();
		this.buscarAlberca();
	}
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getSensores(){
	this._sensorService.getSensores(this.token).subscribe(
		response =>{
			if(!response.sensores){

			}else{
				this.sensores=response.sensores;
			}
		},
		error=>{
			console.log(<any>error);
		}
	);  	
  }
  
  deleteSensor(id){
  	this._sensorService.deleteSensor(this.token,id).subscribe(
  		response =>{
  			if(!response.sensor){
  				alert('Error en el servidor');
  			}
  			this.getSensores();
  		},
  		error =>{
  			alert("Error en el servidor");
  		}
  	);
  }	

  buscarAlberca(){
  	this._route.params.forEach((params:Params) =>{

	  	let id =params['id'];
	  	let imagen = params['imagen'];
	  	this.imagenAlb=imagen;
			this._albercaService.getAlberca(this.token,id).subscribe(
				response =>{
					if(!response){
						this.status="error";
						this.message="ID de registro no encontrada";

					}else{
						this.status="success";
						this.alberca=response.Alberca;
						console.log("Alberca: "+this.alberca);

					}
				},
				error =>{
					console.log(<any>error);
					this.status="error";
					this.message="ID de registro no encontrada";
				}
			);
	    });
	}
}