import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/pages/log-in/log-in.component';
import { RegisterComponent } from './log-in/pages/register/register.component';
import { ListadoReunionesComponent } from './reuniones/pages/listado-reuniones/listado-reuniones.component';
import { BusquedaUsuariosComponent } from './usuarios/pages/busqueda-usuarios/busqueda-usuarios.component';
import { PanelConfiguracionComponent } from './administrador/pages/panel-configuracion/panel-configuracion.component';
import { CoworkingMapComponent } from './coworkingMaps/coworking-module/pages/coworking-map/coworking-map.component';
import { BarrasComponent } from './graficas/pages/barras/barras.component';

const routes: Routes = [
  {
    path: '',
    component: LogInComponent,
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'listadoReuniones/:id',
    component: ListadoReunionesComponent
  },
  {
    path: 'coworkingMaps/:id',
    component: CoworkingMapComponent
  },
  {
    path: 'busquedaUsuarios/:id',
    component: BusquedaUsuariosComponent
  },
  {
    path: 'panelConfiguracion/:id',
    component: PanelConfiguracionComponent
  },
  {
    path: 'estadisticas/:id',
    component: BarrasComponent
  },
  {
    path: '**',
    redirectTo: '',
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
