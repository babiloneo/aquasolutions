import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Socio } from '../../models/socio';
import { GLOBAL } from '../../services/global';
import { SocioService } from '../../services/socio.service';
import { UserService } from '../../services/user.services';
import {TooltipModule} from "ng2-tooltip";

@Component({
	selector:'reg-miebro',
	templateUrl:'./registro-miembro.component.html',
	styleUrls:['./registro-miembro.component.css'],
	providers:[SocioService,UserService]

})

export class RegistroMiembroComponent implements OnInit{
	
	public title: string;
	public socio: Socio;
 	public status: string;
 	public message: string;
    public identity;
    public token;
    public empresa: string;
	constructor(
		private _route: ActivatedRoute,
 		private _router:Router,
 		private _socioService:SocioService,
 		private _userService:UserService
 	){
		this.title="hola";
        this.socio = new Socio('','','','','','socio',true,'','','');

	}
	ngOnInit(){
		
		console.log('registrar miembro cargado');
		this.token=this._userService.getToken();

	}

	onSubmit(registerSocioForm){
		this._socioService.register_socio(this.token,this.socio).subscribe(
			response =>{
				if(response.socio && response.socio._id){
					this.status='success';			 			
	 				this.socio = new Socio('','','','','','socio',true,'','','');
	 				registerSocioForm.reset();
	 				this._router.navigate(['/miembros']);

				}else{
	 				this.status="error";
	 				this.message=response.message;
				}
			},
			error =>{
				console.log(<any>error);
			}
			);
	}

	limpiarForm(registerSocioForm){
	 	this.socio = new Socio('','','','','','socio',true,'','','');
		registerSocioForm.reset();
		this.status='success';			 			

	}
}