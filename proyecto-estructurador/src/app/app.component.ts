import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from './services/user.services';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})

export class AppComponent implements OnInit, DoCheck{
  items: Array<any> = [];
  public secion: String;
  public title:String;
  public identity;
  public url: string;
  public menu: boolean;
  public cuerpo: boolean;
  public miTitulo: string;
  public opc: string;
  public role: boolean;
  public rol:string;
  /*@Input('titulo') miTitulo: string;*/

  constructor(
      private _userService:UserService,
      private _route:ActivatedRoute,
      private _router:Router
    ){
  	this.items =[
  	{name :'./assets/images/ban.jpg'},
  	{name :'./assets/images/ban-ace.jpg'},
  	{name :'./assets/images/ban-con.jpg'},
  	{name :'./assets/images/ban-prod.jpg'}
  	];

    this.title='Aquasolutions';
    this.url=GLOBAL.url;
    this.miTitulo="Panel Administrarivo";
    this.cuerpo=true;
    this.menu=true;
  }

  ngOnInit(){
    this.identity=this._userService.getIdentity();
  }

  ngDoCheck(){
    this.identity=this._userService.getIdentity();
  }

  comprobarUser(ir){
   if(this.identity['Usu_Role']=="admin"){

     switch(ir){
       case "miembros":
            this.miTitulo="Socios";
            this.cuerpo=false;
            this._router.navigate(['/miembros']);
            break;

       case "regAlberca":
            this._router.navigate(['/registrar_alberca']);
            break;
       case "editAlberca":
            this._router.navigate(['/editar_alberca'])
      }
    }
  }

  logout(){
    localStorage.clear();
    this.identity=null;
    this._router.navigate(['/']);
  }

  sayHello() {
    alert('hello from parent component!');
  }
  
  onMenu2(){
    this.menu=false;
    this.cuerpo=true;
  }

  onMenu1(){
    this.menu=true;
    this.miTitulo="Panel Administrarivo";
  }

  verTitulo(event){
    console.log('ver titulo');
    console.log(event);
  }

  activeClientes(){
    this.miTitulo="Socios";
    this.cuerpo=false;
  }

  activeAlberca(){
    this.miTitulo="Albercas";
    this.cuerpo=false;
  }

  activeSensor(){
    this.miTitulo="Sensores"
    this.cuerpo=false;
  }
  activeMantenimiento(){
    this.miTitulo="Mantenimiento";
    this.cuerpo=false;
  }

  volveMenu2(){
    this.cuerpo=true;
    this.miTitulo="Panel Administrarivo";
  }


}