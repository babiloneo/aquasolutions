import { Component, OnInit } from '@angular/core';

@Component({
	selector:'buscar-mant',
	templateUrl:'buscar-mant.component.html',
	styleUrls:['buscar-mant.component.css']
})

export class BuscarMantComponent implements OnInit{

	public title:string;
	
	constructor(){
		this.title="buscar mantenimiento";
	}

	ngOnInit(){
		console.log('busqueda de mantenimiento lista');
	}
}