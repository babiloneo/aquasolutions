import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute,Params} from '@angular/router';
import { GLOBAL } from '../../services/global';
import { Sensor } from '../../models/sensor'; 
import { SensorService } from '../../services/sensor.service';
import { UserService } from '../../services/user.services';
import { UploadService } from '../../services/upload.services';

@Component({
	selector:'editar-sensor',
	templateUrl:'./editar-sensor.component.html',
	styleUrls:['./editar-sensor.component.css'],
	providers:[UserService,SensorService,UploadService]
})

export class EditarSensorComponent implements OnInit{


	public title: string;
	public sensor:Sensor;
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
		private _sensorService:SensorService,
		private _uploadService:UploadService,
		){
		this.title="ALBERCAS";
		this.identity=this._userService.getIdentity();
		this.token=this._userService.getToken();
		this.url=GLOBAL.url;
	}
	ngOnInit(){
		console.log('editar sensor');
	}

	getSensor(){
		this._sensorService.getSensor(this.token,this.buscarId).subscribe(
			response =>{
				if(!response){
					this.status="error";
					this.message="ID de registro no encontrada";

				}else{
					this.status="success";
					this.sensor=response.sensor;
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
		var id = this.sensor._id;
		this._sensorService.editSensor(this.token,id,this.sensor).subscribe(
			response =>{
				if(!response.sensor){
					this.status="error";
				}else{
					this.status="successs";
					this.sensor = response.sensor;

					//subir foto alberca
					if(!this.filesToUpload){
						this._router.navigate(['/buscar_alberca']);
					}else{
						this._uploadService.makeFileRequest(this.url+'upload_image_sensor/'+this.sensor._id,[],this.filesToUpload,this.token,'Sen_Image')
					   .then((result: any) =>{
					   	this.sensor.Sen_Image = result.Alb_Image;
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

	limpiarForm(editerSensorForm,buscarSensorForm){
		this.sensor = new Sensor('','','','','','',true,'');
		editerSensorForm.reset();
		this.status='success';
		this.buscarId="";		
		buscarSensorForm.reset();
	}
}