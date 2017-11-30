import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.services';
import { User } from '../../models/user';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


import { ChangeDetectorRef, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
	selector:'recobery',
	templateUrl:'./recovery.component.html',
	styleUrls:['./recovery.component.css'],
	providers:[UserService]
})
 export class RecoberyComponent implements OnInit{
 	public title: String;
 	public user:User;
 	public identity;
 	public token;
 	public status: string;
 	public message: string;
 	public cajita:boolean;
 	modalRef: BsModalRef;
  	subscriptions: Subscription[] = [];
  	messages: string[] = [];
  	public verificacion: string;
  	public correo:string;
  	public confi:string;
  	public nuevo:string;
  	public estado:boolean;
 	constructor(
 		private _route: ActivatedRoute,
 		private _router:Router,
 		private _userService:UserService
 		){
 			this.title = 'Login';
 			this.user = new User('','','','','','','','admin',false,'','');
 			this.cajita=false;
 			this.token=this._userService.getToken();
 			this.estado=true;
 		}


		obtenermicontra(){
			if(this.estado){
				console.log("si entra y aqui esta el error");
				this._userService.getPaswword(this.user).subscribe(
					response =>{
						if(response.estado==0){
							this.message="Codigo de confirmacion  Incorrecto";
						}else{
							this.cajita=true;
						}
					},error =>{
						this.message="Error en el servidor";				
						this.status="error";
						console.log(<any>error);
				});
				this.estado=false;
			}else{
				this._userService.updatePaswword(this.user).subscribe(
					response =>{
						if(response.password){
							alert("Contraseña cambiada correctamente")
							this._router.navigate(['/login']);
							this.user = new User('','','','','','','','admin',false,'','');

						}else{
							this.message="Error al actualizar";

						}
					},error=>{
						var errorMessage =<any>error;
						if(errorMessage !=null){
							this.status="error";

						}
					});
			}
		}

 		ngOnInit(){
 			console.log('Login cargado');
 		}

 }