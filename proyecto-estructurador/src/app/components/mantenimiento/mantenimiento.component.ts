import { Component, OnInit } from '@angular/core';

@Component({
	selector:'mantenimiento',
	templateUrl:'mantenimiento.component.html',
	styleUrls:['mantenimiento.component.css']
})

export class MantenimientoComponent implements OnInit{

	ngOnInit(){
		console.log("mantenimiento.component Cargado!");
	}
}