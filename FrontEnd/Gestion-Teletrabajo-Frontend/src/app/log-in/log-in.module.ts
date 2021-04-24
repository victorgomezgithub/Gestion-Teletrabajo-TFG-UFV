import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './pages/log-in/log-in.component';
import { LogInPlantillaComponent } from './pages/log-in-plantilla/log-in-plantilla.component';
import { SharedModule } from '../shared/shared-module.module';
import { RegisterComponent } from './pages/register/register.component';
import { AppRoutingModule } from '../app-routing.module';
import { OlvidadoContrasenaComponent } from './pages/olvidado-contrasena/olvidado-contrasena.component';



@NgModule({
  declarations: [
    LogInComponent,
    LogInPlantillaComponent,
    RegisterComponent,
    OlvidadoContrasenaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    LogInPlantillaComponent,
  ]
})
export class LogInModule { }
