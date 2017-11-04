import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.css']
})

export class HomeComponent implements OnInit{
  	title = 'Bienbenido a NGZOO';

	//se lanza despues del OnInit,sse ejecuta despues de un evento  
	ngOnInit(){
		console.log("Home.component cargado !!");
	}
}