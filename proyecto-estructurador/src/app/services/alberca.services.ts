import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class AlbercaService  {
	public url: string;
	public identity;
	public token;
	constructor(private _http:Http) {
		this.url=GLOBAL.url;
	}

	addAlberca(token,alberca){
		let params = JSON.stringify(alberca);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		return this._http.post(this.url+'add_alberca',params,{headers:headers})
				   .map(res => res.json());

	}

	getAlbercas(token){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options= new RequestOptions({headers:headers});

		return this._http.get(this.url+'listar_albercas',options)
						 .map(res=>res.json());
	}

	getAlberca(token,id){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options= new RequestOptions({headers:headers});

		return this._http.get(this.url+'obtener_alberca/'+id,options)
					.map(res=>res.json());
	}

	deleteAlberca(token,id){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options= new RequestOptions({headers:headers});

		return this._http.delete(this.url+'delete_alberca/'+id,options)
				   .map(res=>res.json());
	}

	editAlberca(token,id,alberca){
		let params = JSON.stringify(alberca);
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		return this._http.put(this.url+'update_alberca/'+id,params,{headers:headers})
					.map(res => res.json());

	}
}	 