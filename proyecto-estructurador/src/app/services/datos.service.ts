import { Injectable } from '@angular/core';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class DatosService  {
	public url;
	public identity;
	public token;
	constructor
	(
		private _http:Http
	)
	{
		this.url=GLOBAL.url;
	}

	getDato(id,token){
		let headers = new Headers({
			'Content-Type':'application/json',
			'Authorization':token
		});

		let options= new RequestOptions({headers:headers});

		return this._http.get(this.url+'getRegistro/'+id,options)
						 .map(res=>res.json());
	}
}