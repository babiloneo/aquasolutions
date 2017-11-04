import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Array<any> = [];
  public secion: String;
  constructor(){
  	this.items =[
  	{name :'./assets/images/ban.jpg'},
  	{name :'./assets/images/ban-ace.jpg'},
  	{name :'./assets/images/ban-con.jpg'},
  	{name :'./assets/images/ban-prod.jpg'}
  	];
  }
}
