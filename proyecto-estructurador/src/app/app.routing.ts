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
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AdminComponent } from './components/admin/admin.component';
import { MiembrosComponent } from './components/miembros/miembros.component';
import { RegistroMiembroComponent } from './components/registro-miembro/registro-miembro.component';
import { EditarMiembroComponent } from './components/editar-miembro/editar-miembro.component';
import { BucarAlbercaComponent } from './components/buscar-alberca/buscar-alberca.component';
import { RegistrarAlbercaComponent } from './components/registrar-alberca/registrar-alberca.component';
import { EditarAlbercaComponent } from './components/editar-alberca/editar-alberca.component';
import { BuscarSensorComponent } from './components/buscar-sensor/buscar-sensor.component';
import { RegistrarSensorComponent } from './components/registrar-sensor/registrar-sensor.component';
import { EditarSensorComponent } from './components/editar-sensor/editar-sensor.component';
import { BuscarMantComponent } from './components/buscar-mant/buscar-mant.component';
import { RegistrarMantComponent } from './components/registrar-mant/registrar-mant.component';
import { EditarMantComponent } from './components/editar-mant/editar-mant.component';

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
	{path: 'mis-datos', component: UserEditComponent},
	{path: 'admin', component: AdminComponent},
	{path: 'miembros', component: MiembrosComponent},
	{path: 'registrarmiembro', component: RegistroMiembroComponent},
	{path: 'editar_miembro', component: EditarMiembroComponent},
	{path: 'buscar_alberca', component: BucarAlbercaComponent},
	{path: 'registrar_alberca', component: RegistrarAlbercaComponent},
	{path: 'editar_alberca', component: EditarAlbercaComponent},
	{path: 'buscar_sensor/:id', component: BuscarSensorComponent},
	{path: 'registrar_sensor/:id', component: RegistrarSensorComponent},
	{path: 'editar_sensor', component: EditarSensorComponent},
	{path: 'buscar_mante', component: BuscarMantComponent},
	{path: 'registrar_mante', component: RegistrarMantComponent},
	{path: 'editar_mante', component: EditarMantComponent},

	{path: '**', component: HomeComponent}//cuando la ruta falle o intentemos cargar una pagina que no existe

	//{path: 'tienda', component: TiendaComponent},

];

export const appRoutingProviders: any[] = [];
export const  routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);//modulo de rutas
