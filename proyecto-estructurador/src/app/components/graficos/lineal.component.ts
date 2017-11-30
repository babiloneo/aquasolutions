import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Observable } from "rxjs";
import { Router,ActivatedRoute,Params} from '@angular/router';
import { DatosService } from '../../services/datos.service';
import { UserService } from '../../services/user.services';
import { Datos } from '../../models/datos';

@Component({
	selector:'lineal',
	templateUrl:'lineal.component.html',
    styleUrls:['lineal.component.css'],
    providers:[DatosService,UserService]
    
    })

export class LinealComponent implements OnInit{

    public token;
    public datosObtenido:Datos;
    public status: string;
    public message:string;
    constructor(
        private _route:ActivatedRoute,
        private _router:Router,
        private _datosService:DatosService,
        private _userService:UserService
    )
    {
        this.token=this._userService.getToken();
    }

    chart = new Chart( {

        colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', 
             '#FF9655', '#FFF263', '#6AF9C4'],    
        chart: {
            type: 'spline',
            backgroundColor: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, '#ffF'],
                    [1, '#fff']
                ]
        },style:{
            color:'#000'
        }
        },
        title: {
            text: 'Medidas tomadas por los sensores',
            style: {
            color: '#000',
            font: 'bold 18px "Trebuchet MS", Verdana, sans-serif'
        }
        },
        subtitle: {
            text: 'Esta es un grafica hecha con la libreria de Highcharts',
            style: {
            color: '#000',
            font: 'bold 14px "Trebuchet MS", Verdana, sans-serif'
        }
        },
        legend: {
            itemStyle: {
                font: 'bold 12px "Trebuchet MS", Verdana, sans-serif',
                color: '#000'
            },
            itemHoverStyle:{
                color: '#000'
            }   
        },
        xAxis: {
            className:'xaxis',
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                //second: '%H:%M:%S',
                month: '%e. %b',
                year: '%b'
            },
            lineColor:'#fff'
            ,
            title: {
                text: 'Tiempo en el que se tomo la medida',
                style:{
                    color:'#000',
                    font:'bold 14px "Trebuchet MS", Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            className: 'highcharts-color-0',
            title: {
                text: 'Medidas de los sensores',
                style:{
                    color:'#000',
                    font:'bold 14px "Trebuchet MS", Verdana, sans-serif'
                }
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b. %H:%M:%S}:  {point.y:.2f}',
            style:{
                color:'#000',
                backgroundColor:'#172645'
            }
        },

        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                }
            }
        },

        series: [{
            name: 'Medida: ',
            data: []
        }]
    });


    requestData(){
        this._route.params.forEach((params:Params) =>{
            let id =params['id'];
            this._datosService.getDato(id,this.token).subscribe(
                response =>{
                    if(!response.registro){
                        this.status="error";
                        this.message=response.message;
                    }else{
                        this.datosObtenido=response.registro;
                        var dato = parseFloat(this.datosObtenido[0].registro);
                        //console.log(""+this.dato);
                        this.chart.addPoint(dato);
                    }
                },
                error =>{
                    console.log(<any>error);
                    this.status="error";
                    this.message="Error en el servidor";
                }
            );



            setTimeout(()=>{ 
            this.requestData();   //<<<---    using ()=> syntax
             },5000);
        });
    }

	ngOnInit(){
		console.log('mi grafica');
        this.requestData();
	}		
}