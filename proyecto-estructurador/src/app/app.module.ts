import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';       
import { HttpModule} from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

//import { ChartModule } from 'angular-highcharts';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import exporting from 'highcharts/modules/exporting.src';
import { TooltipModule } from "ng2-tooltip";
import { AppBootstrapModule } from './app-bootstrap.module';
import { SearchPipe } from './pipes/search.pipe';
//todos mis componentes
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { AcercaDeComponent } from './components/acercaDe/acercaDe.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
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

/*export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [ exporting ];
}*/


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductosComponent,
    AcercaDeComponent,
    ContactosComponent,
    RegisterComponent,
    LoginComponent,
    VentasComponent,
    MantenimientoComponent,
    LinealComponent,
    UserEditComponent,
    AdminComponent,
    MiembrosComponent,
    RegistroMiembroComponent,
    EditarMiembroComponent,
    BucarAlbercaComponent,
    RegistrarAlbercaComponent,
    EditarAlbercaComponent,
    BuscarSensorComponent,
    RegistrarSensorComponent,
    EditarSensorComponent,
    BuscarMantComponent,
    RegistrarMantComponent,
    EditarMantComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    Ng2CarouselamosModule,
    ChartModule,
    TooltipModule,
    AppBootstrapModule
  ],
  providers:
  appRoutingProviders,
  bootstrap: [AppComponent]
})
export class AppModule { }
