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
	selector:'login',
	templateUrl:'./login.component.html',
	styleUrls:['./login.component.css'],
	providers:[UserService]
})
 export class LoginComponent implements OnInit{
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

 	constructor(
 		private _route: ActivatedRoute,
 		private _router:Router,
 		private _userService:UserService,
 		private modalService: BsModalService,
		private changeDetection: ChangeDetectorRef,
 		){
 			this.title = 'Login';
 			this.user = new User('','','','','','','','admin',false,'','');
 			this.cajita=false;
 			this.token=this._userService.getToken();
 		}
		openModal(template: TemplateRef<any>) {
		    this.modalRef = this.modalService.show(template);
		}

		password(){
			alert("hola");

			
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
		}

 		ngOnInit(){
 			console.log('Login cargado');
 			//console.log(this._userService.getIdentity());
 			//console.log(this._userService.getToken());
 		}

 		onSubmit(){
 			//loguear el usuario y conseguir el objeto
 			this._userService.signup(this.user).subscribe(
 				response =>{
 					this.identity = response.user;

 					if(!this.identity || !this.identity._id){
 						this.status="error";
 						this.message=response.message;
 					}else{
 						localStorage.setItem('identity',JSON.stringify(this.identity));

 						//conseguir el tokken
			 			this._userService.signup(this.user,'true').subscribe(
			 				response =>{
			 	 				this.token = response.token;

			 					if(this.token.lenght <= 0){
			 						alert('El toekn no se ha generado');

			 					}else{
			 						//mostrar token
			 						localStorage.setItem('token',this.token);
			 						this.status='success';
			 						this._router.navigate(['/']);
			 					}
			 				},
			 				error =>{
			 					console.log(<any>error);
			 				}
			 			);
			 		}
 				},
 				error =>{
 					var errorMessage =<any>error;
 					if(errorMessage != null){
 						var body = JSON.parse(error._body);
 						this.status = 'error';
 					}
 				}
 			);
 		}
 }