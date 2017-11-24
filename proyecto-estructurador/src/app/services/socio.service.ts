import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';


@Injectable()
export class SocioService  {
	public url: string;
	public identity;
	public token;
	constructor(private _http:Http) {
		this.url=GLOBAL.url;
	}

	register_socio(token,socio){
		let params = JSON.stringify(socio);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options= new RequestOptions({headers:headers});


		return this._http.post(this.url+'socio-register',params,options)
						 .map(res => res.json());
	}

	getSocios(token,id){

		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options= new RequestOptions({headers:headers});

		return this._http.get(this.url+'socios/'+id,options)
						 .map(res=>res.json());
	}

	deleteSocios(token,id,socio){
		let params = JSON.stringify(socio);

		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options= new RequestOptions({headers:headers});

		return this._http.post(this.url+'delete-user/'+id,params,options)
				   .map(res=>res.json());
	}

	getSocio(token,id){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options= new RequestOptions({headers:headers});

		return this._http.get(this.url+'getsocios/'+id,options)
					.map(res=>res.json());
	}

	updateSocio(token,user_to_update){
		let params = JSON.stringify(user_to_update);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options= new RequestOptions({headers:headers});

		return this._http.put(this.url+'update-socio/'+user_to_update._id,params,options)
						 .map(res => res.json());
	}

}