import { Component,OnInit,Output, EventEmitter } from '@angular/core';

@Component({
	selector:'admin',
	templateUrl:'./admin.component.html',
	styleUrls:['./admin.component.css']
})

export class AdminComponent implements OnInit{
	public title: string;
	@Output() pasarelaTitulo= new EventEmitter();
	public barraTitulo: string;
	constructor(){
		this.title="Panel Administrativo";
	}
	ngOnInit(){
		console.log('Admini cargado!!');
	}

	activeClientes(){
		/*console.log('se lannso el evento de activeCliente');
		this.pasarelaTitulo.emit({
			'titulo':this.barraTitulo="CLIENTES"
		});*/

		
	}
}