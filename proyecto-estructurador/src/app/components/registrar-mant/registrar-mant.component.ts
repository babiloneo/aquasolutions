import { Component, OnInit } from '@angular/core';

@Component({
	selector:'.registrar-mant',
	templateUrl:'./registrar-mant.component.html',
	styleUrls:['./registrar-mant.component.css']
})

export class RegistrarMantComponent implements OnInit{

	public title: string;
	constructor(){
		this.title="mantenimiento";
	}
	ngOnInit(){
		console.log('registrar marca cargado');
	}
}