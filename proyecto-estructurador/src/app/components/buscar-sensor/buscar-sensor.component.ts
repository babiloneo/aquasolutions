import { Component, OnInit } from '@angular/core';

import { Router,ActivatedRoute,Params} from '@angular/router';
import { GLOBAL } from '../../services/global';
import { Sensor } from '../../models/sensor'; 
import { SensorService } from '../../services/sensor.service';
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
	providers:[SensorService,UserService]

})

export class BuscarSensorComponent  implements OnInit{
	
	public title: string;
	public sensor:Sensor;
	public url;
	public status;
	public message;
	public token;
	public sensores: Sensor[];
	public busqueda;
	modalRef: BsModalRef;
  	subscriptions: Subscription[] = [];
  	messages: string[] = [];

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _sensorService:SensorService,
		private _userService:UserService,
		private modalService: BsModalService,
		private changeDetection: ChangeDetectorRef
		){
		this.title="sensor";
		this.token=this._userService.getToken();
		this.url = GLOBAL.url;

	}

	ngOnInit(){
		this.getSensores();
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

}