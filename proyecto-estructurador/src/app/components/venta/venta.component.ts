import { Component, OnInit } from '@angular/core';

@Component({
	selector:'venta',
	templateUrl:'venta.component.html',
	styleUrls:['venta.component.css']
})

export class VentasComponent implements OnInit{

	ngOnInit(){
		console.log("ventas.component Cargado!");
	}
}