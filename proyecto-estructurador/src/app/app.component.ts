import { Component, OnInit, DoCheck } from '@angular/core';
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
  }

  ngOnInit(){
    this.identity=this._userService.getIdentity();
  }

  ngDoCheck(){
    this.identity=this._userService.getIdentity();    
  }

  logout(){
    localStorage.clear();
    this.identity=null;
    this._router.navigate(['/']);
  }
}
