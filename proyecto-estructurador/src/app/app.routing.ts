//sistema de rutas de angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

//Componentes
import {HomeComponent} from './components/home/home.component';
import {ProductosComponent} from './components/productos/productos.component';
import { AcercaDeComponent } from './components/acercaDe/acercaDe.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { VentasComponent } from './components/venta/venta.component';
import { MantenimientoComponent } from './components/mantenimiento/mantenimiento.component';
import { LinealComponent } from './components/graficos/lineal.component';


const appRoutes: Routes =[
	//{path: '', component: HomeComponent}, //ruta por defecto
	{path: '', redirectTo: 'home', pathMatch: 'full'},//cuando se cargue la ruta vacia redirija a otra ruta
	{path: 'home', component: HomeComponent},
	{path: 'productos', component: ProductosComponent},
	{path: 'acercade', component: AcercaDeComponent},
	{path: 'contactos', component: ContactosComponent},
	{path: 'register', component: RegisterComponent},
	{path: 'login', component: LoginComponent},
	{path: 'ventas', component: VentasComponent},
	{path: 'mantenimiento', component: MantenimientoComponent},
	{path: 'graf-lineal', component: LinealComponent},
	//{path: 'tienda', component: TiendaComponent},
	{path: '**', component: HomeComponent}//cuando la ruta falle o intentemos cargar una pagina que no existe

];

export const appRoutingProviders: any[] = [];
export const  routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);//modulo de rutas
