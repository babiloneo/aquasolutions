import { Component, OnInit} from '@angular/core';

@Component({
	selector:'contactos',
	templateUrl:'./contactos.component.html',
	styleUrls:['./contactos.component.css']
})

export class ContactosComponent implements OnInit{

	public tittle;
	ngOnInit(){
		console.log("Exito!!");
	}
}