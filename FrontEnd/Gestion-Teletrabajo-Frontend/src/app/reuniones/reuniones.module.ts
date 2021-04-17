import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared-module.module';
import { ListadoReunionesComponent } from './pages/listado-reuniones/listado-reuniones.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListadoReunionesComponent,
    ConfiguracionComponent,
    CalendarioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  exports: [
    ListadoReunionesComponent,
  ]
})
export class ReunionesModule { }
