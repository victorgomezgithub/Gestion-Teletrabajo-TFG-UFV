import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared-module.module';
import { ListadoReunionesComponent } from './pages/listado-reuniones/listado-reuniones.component';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbAlertModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalFormReunionComponent } from './pages/modal-form-reunion/modal-form-reunion.component';
import { AlertService } from 'alert-service';



@NgModule({
  declarations: [
    ListadoReunionesComponent,
    CalendarioComponent,
    ModalFormReunionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbModalModule,
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  exports: [
    ListadoReunionesComponent,
  ],
  providers: [AlertService]
})
export class ReunionesModule { }
