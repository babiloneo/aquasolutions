import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
	selector:'lineal',
	templateUrl:'lineal.component.html',
    styleUrls:['lineal.component.css']
    
    })

export class LinealComponent implements OnInit{

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
                second: '%H:%M:%S',
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
            name: 'PH',
            data: [
                
                [Date.UTC(1970, 9, 21), 0],
                [Date.UTC(1970, 10, 4), 0.18],
                [Date.UTC(1970, 10, 9), 0.35],
                [Date.UTC(1970, 10, 27), 0.22],
                [Date.UTC(1970, 11, 2), 0.29],
                [Date.UTC(1970, 11, 26), 0.58],
                [Date.UTC(1970, 11, 29), 0.57],
                [Date.UTC(1971, 0, 11), 0.39],
                [Date.UTC(1971, 0, 26), 0.32],
                [Date.UTC(1971, 1, 3), 1.52],
                [Date.UTC(1971, 1, 11), 1.42],
                [Date.UTC(1971, 1, 25), 1.3],
                [Date.UTC(1971, 2, 11), 1.28],
                [Date.UTC(1971, 3, 11), 1.89],
                [Date.UTC(1971, 4, 1), 1.15],
                [Date.UTC(1971, 4, 5), 2.92],
                [Date.UTC(1971, 4, 19), 1.75],
                [Date.UTC(1971, 5, 3), 3]
            ]
        },
        {
            name: 'Temperatura',
            data: [
                
                [Date.UTC(1970, 9, 21), 0],
                [Date.UTC(1970, 10, 4), 0.28],
                [Date.UTC(1970, 10, 9), 0.25],
                [Date.UTC(1970, 10, 27), 0.2],
                [Date.UTC(1970, 11, 2), 0.28],
                [Date.UTC(1970, 11, 26), 0.28],
                [Date.UTC(1970, 11, 29), 0.47],
                [Date.UTC(1971, 0, 11), 0.79],
                [Date.UTC(1971, 0, 26), 0.72],
                [Date.UTC(1971, 1, 3), 1.02],
                [Date.UTC(1971, 1, 11), 1.12],
                [Date.UTC(1971, 1, 25), 1.2],
                [Date.UTC(1971, 2, 11), 1.18],
                [Date.UTC(1971, 3, 11), 1.19],
                [Date.UTC(1971, 4, 1), 1.85],
                [Date.UTC(1971, 4, 5), 2.22],
                [Date.UTC(1971, 4, 19), 1.15],
                [Date.UTC(1971, 5, 3), 0]
            ]
        },
        {
            name: 'Amperaje',
            // Define the data points. All series have a dummy year
            // of 1970/71 in order to be compared on the same x axis. Note
            // that in JavaScript, months start at 0 for January, 1 for February etc.
            data: [
                
                [Date.UTC(1970, 9, 21), 12.3],
                [Date.UTC(1970, 10, 4), 10.28],
                [Date.UTC(1970, 10, 9), 12.25],
                [Date.UTC(1970, 10, 27), 15.2],
                [Date.UTC(1970, 11, 2), 15.28],
                [Date.UTC(1970, 11, 26), 15.28],
                [Date.UTC(1970, 11, 29), 15.47],
                [Date.UTC(1971, 0, 11), 12.79],
                [Date.UTC(1971, 0, 26), 11.72],
                [Date.UTC(1971, 1, 3), 12.02],
                [Date.UTC(1971, 1, 11), 13.12],
                [Date.UTC(1971, 1, 25), 12.2],
                [Date.UTC(1971, 2, 11), 12.18],
                [Date.UTC(1971, 3, 11), 13.19],
                [Date.UTC(1971, 4, 1), 11.85],
                [Date.UTC(1971, 4, 5), 14.22],
                [Date.UTC(1971, 4, 19), 10.15],
                [Date.UTC(1971, 5, 3),17.00]
            ]
        }]
    });

    add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
    }

	ngOnInit(){
		console.log('mi grafica');

	}		
}