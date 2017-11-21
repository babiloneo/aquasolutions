import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { User2 } from '../../models/user2';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.services';
import {TooltipModule} from "ng2-tooltip";

@Component({
	selector:'reg-miebro',
	templateUrl:'./registro-miembro.component.html',
	styleUrls:['./registro-miembro.component.css'],
	providers:[UserService]

})

export class RegistroMiembroComponent implements OnInit{
	
	public title: string;
	public user: User;
	public userResgistrar:User2;
 	public status: string;
 	public message: string;
    public identity;
    public empresa: string;
	constructor(
		private _route: ActivatedRoute,
 		private _router:Router,
 		private _userService:UserService
 	){
		this.title="hola";
		this.identity = this._userService.getIdentity();
        this.empresa = this.identity['Usu_Empresa'];
        this.user = new User('','','','','','',this.empresa,'socio',false,'','');

	}
	ngOnInit(){
		
		console.log('registrar miembro cargado');
	}



	onSubmit(registerUserForm){
		this._userService.register(this.user).subscribe(
			response =>{
				if(response.user && response.user._id){
					this.status='success';			 			
	 				this.user = new User('','','','','','',this.empresa,'socio',false,'','');
	 				registerUserForm.reset();
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

	limpiarForm(registerUserForm){
		this.user = new User('','','','','','',this.empresa,'socio',false,'','');
		registerUserForm.reset();
		this.status='success';			 			

	}
}