import { Component,OnInit } from '@angular/core';

@Component({
	selector:'editar-mante',
	templateUrl:'./editar-mant.component.html',
	styleUrls:['./editar-mant.component.css']
})

export class EditarMantComponent implements OnInit{
	
	public title: string;
	constructor(){

	}
	ngOnInit(){
		console.log('editar mantenimiento cargado');
	}
}