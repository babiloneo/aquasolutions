import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class SensorService  {
	public url: string;
	public identity;
	public token;
	constructor(private _http:Http) {
		this.url=GLOBAL.url;
	}

	addSensor(token,sensor){
		let params = JSON.stringify(sensor);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		return this._http.post(this.url+'add_sensor',params,{headers:headers})
				   .map(res => res.json());

	}

	getSensores(token,id){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options= new RequestOptions({headers:headers});

		return this._http.get(this.url+'listar_sensores/'+id,options)
						 .map(res=>res.json());
	}

	getSensor(token,id){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options= new RequestOptions({headers:headers});

		return this._http.get(this.url+'obtener_sensor/'+id,options)
					.map(res=>res.json());
	}

	deleteSensor(token,id){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options= new RequestOptions({headers:headers});

		return this._http.delete(this.url+'delete_sensor/'+id,options)
				   .map(res=>res.json());
	}

	editSensor(token,id,sensor){
		let params = JSON.stringify(sensor);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		return this._http.put(this.url+'update_sensor/'+id,params,{headers:headers})
					.map(res => res.json());

	}
}	 