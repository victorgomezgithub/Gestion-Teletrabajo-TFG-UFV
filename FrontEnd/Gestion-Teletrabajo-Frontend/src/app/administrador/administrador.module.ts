import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelConfiguracionComponent } from './pages/panel-configuracion/panel-configuracion.component';
import { SharedModule } from '../shared/shared-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [PanelConfiguracionComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbAlertModule,
    ReactiveFormsModule
  ]
})
export class AdministradorModule { }
