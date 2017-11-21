import { Component, OnInit } from '@angular/core';

@Component({
	selector:'edit-miembro',
	templateUrl:'./editar-miembro.component.html',
	styleUrls:['./editar-miembro.component.css']
})

export class EditarMiembroComponent implements OnInit {
	
	constructor() {
		// code...
	}

	ngOnInit(){
		console.log('editar miembro cargado');
	}
}