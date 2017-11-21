import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.services';
import {TooltipModule} from "ng2-tooltip";

@Component({
	selector:'register',
	templateUrl:'./register.component.html',
	styleUrls:['./register.component.css'],
	providers:[UserService]
})
 export class RegisterComponent implements OnInit{
 	public title: String;
 	public user: User;
 	public status: string;
 	public message: string;
 	constructor(
 		private _route: ActivatedRoute,
 		private _router:Router,
 		private _userService:UserService
 		){
 			this.title = 'Registro';
 			this.user = new User('','','','','','','','admin',false,'','');
 		}

 		ngOnInit(){
 			console.log('registro cargado');
 		}

 		onSubmit(registerForm){
 			this._userService.register(this.user).subscribe(
 				response =>{
 					if(response.user && response.user._id){
	 					this.status='success';			 			
			 			this.user = new User('','','','','','','','admin',false,'','');
			 			registerForm.reset();
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
 }