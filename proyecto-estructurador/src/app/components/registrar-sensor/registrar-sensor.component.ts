import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute,Params} from '@angular/router';
import { GLOBAL } from '../../services/global';
import { Alberca } from '../../models/alberca'; 
import { Sensor } from '../../models/sensor'; 
import { SensorService } from '../../services/sensor.service';
import { UserService } from '../../services/user.services';
import { UploadService } from '../../services/upload.services';

@Component({
	selector:'registrar-sensor',
	templateUrl:'./registrar-sensor.component.html',
	styleUrls:['./registrar-sensor.component.css'],
	providers:[UserService,SensorService,UploadService]
})

export class RegistrarSensorComponent implements OnInit{

	public title: string;
	public sensor:Sensor;
	public identity;
	public token;
	public url;
	public status;
	public message;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService,
		private _sensorService:SensorService,
		private _uploadService:UploadService,
		){
		this.title="sensor";
		this.sensor=new Sensor('','','','','','',true,'');
		this.identity=this._userService.getIdentity();
		this.token=this._userService.getToken();
		this.url=GLOBAL.url;
	}
	ngOnInit(){
		console.log('mi  registro de alberca');
	}

	onSubmit(){
		this._route.params.forEach((params:Params) =>{
			//obtengo la id
			let id =params['id'];
			this.sensor.Id_Alberca=id;

			this._sensorService.addSensor(this.token,this.sensor).subscribe(
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
						   	this.sensor.Sen_Image = result.Sen_Image;
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

		});
	}

	public filesToUpload: Array<File>;
	fileChangeEvent(fileInput:any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	public limpiarForm(formulario){
		formulario.reset();
		this._router.navigate(['/buscar_alberca']);

	}

}