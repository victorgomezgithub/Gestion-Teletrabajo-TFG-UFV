import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusquedaUsuariosComponent } from './pages/busqueda-usuarios/busqueda-usuarios.component';
import { SharedModule } from '../shared/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';


@NgModule({
  declarations: [
    BusquedaUsuariosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  exports: [
    BusquedaUsuariosComponent
  ]
})
export class UsuariosModule { }
