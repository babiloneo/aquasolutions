import { Component,OnInit, Input } from '@angular/core';

@Component({
	selector:'miembros',
	templateUrl:'./miembros.component.html',
	styleUrls:['./miembros.component.css']
})

export class MiembrosComponent implements OnInit{
	
	public title: string;
    @Input() opcion: string;

	constructor(){
		this.opcion="ID";
	}

	ngOnInit(){
		console.log('miembros cargado');
	}
}