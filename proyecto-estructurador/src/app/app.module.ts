import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';       
import { HttpModule} from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
//import { ChartModule } from 'angular-highcharts';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import exporting from 'highcharts/modules/exporting.src';
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

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [ exporting ];
}


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
    LinealComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    Ng2CarouselamosModule,
    ChartModule
  ],
  providers: [
  { provide: HIGHCHARTS_MODULES, useFactory: highchartsModules },
  appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
