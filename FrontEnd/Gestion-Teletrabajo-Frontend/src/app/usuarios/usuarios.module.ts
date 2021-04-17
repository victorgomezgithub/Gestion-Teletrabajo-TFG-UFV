import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusquedaUsuariosComponent } from './pages/busqueda-usuarios/busqueda-usuarios.component';
import { SharedModule } from '../shared/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalFormComponent } from './pages/modal-form/modal-form.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    BusquedaUsuariosComponent,
    ModalFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule
  ],
  exports: [
    BusquedaUsuariosComponent,
  ]
})
export class UsuariosModule { }
