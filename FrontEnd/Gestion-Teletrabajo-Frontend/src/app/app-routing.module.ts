import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/pages/log-in/log-in.component';
import { RegisterComponent } from './log-in/pages/register/register.component';
import { OlvidadoContrasenaComponent } from './log-in/pages/olvidado-contrasena/olvidado-contrasena.component';
import { ListadoReunionesComponent } from './reuniones/pages/listado-reuniones/listado-reuniones.component';
import { BusquedaUsuariosComponent } from './usuarios/pages/busqueda-usuarios/busqueda-usuarios.component';

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
    path: 'recuperarPassword',
    component: OlvidadoContrasenaComponent,
  },
  {
    path: 'listadoReuniones',
    component: ListadoReunionesComponent
  },
  {
    path: 'busquedaUsuarios',
    component: BusquedaUsuariosComponent
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
