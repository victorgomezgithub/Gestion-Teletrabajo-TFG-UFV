import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './pages/log-in/log-in.component';
import { RegisterComponent } from './pages/register/register.component';
import { OlvidadoContrasenaComponent } from './pages/olvidado-contrasena/olvidado-contrasena.component';

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
