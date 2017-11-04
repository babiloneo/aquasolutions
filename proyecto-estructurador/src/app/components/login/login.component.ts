import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.services';
import { User } from '../../models/user';
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
 	constructor(
 		private _route: ActivatedRoute,
 		private _router:Router,
 		private _userService:UserService
 		){
 			this.title = 'Login';
 			this.user = new User('','','','','','','admin',false,'','');

 		}

 		ngOnInit(){
 			console.log('Login cargado');
 		}

 		onSubmit(){
 			//loguear el usuario y conseguir el objeto
 			this._userService.signup(this.user).subscribe(
 				response =>{
 					this.identity = response.user;

 					if(!this.identity || !this.identity._id){
 						alert('El usuario no se a logueado correctamente');
 					}else{
 					//mostrar identity
 					this.identity.password='';
 					console.log(this.identity);	

 						//conseguir el tokken
			 			this._userService.signup(this.user,'true').subscribe(
			 				response =>{
			 	 				this.token = response.token;

			 					if(this.token.lenght <= 0){
			 						alert('El toekn no se ha generado');
			 					}else{
			 						//mostrar token
			 						console.log(this.token);
			 						this.status='success';
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