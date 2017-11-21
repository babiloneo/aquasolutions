import { Component,OnInit } from '@angular/core';

@Component({
	selector:'editar-sensor',
	templateUrl:'./editar-sensor.component.html',
	styleUrls:['./editar-sensor.component.css']
})

export class EditarSensorComponent implements OnInit{

	public title: string;
	constructor(){
		this.title="editar sensor";
	}
	ngOnInit(){
		console.log('editar sensor listo');
	}
}