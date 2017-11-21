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
 	public message: string;
 	constructor(
 		private _route: ActivatedRoute,
 		private _router:Router,
 		private _userService:UserService
 		){
 			this.title = 'Login';
 			this.user = new User('','','','','','','','admin',false,'','');

 		}
 		

 		ngOnInit(){
 			console.log('Login cargado');
 			console.log(this._userService.getIdentity());
 			console.log(this._userService.getToken());
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