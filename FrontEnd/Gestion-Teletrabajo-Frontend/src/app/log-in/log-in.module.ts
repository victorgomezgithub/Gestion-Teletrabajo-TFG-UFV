import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './pages/log-in/log-in.component';
import { QuienesSomosComponent } from './pages/quienes-somos/quienes-somos.component';
import { LogInPlantillaComponent } from './pages/log-in-plantilla/log-in-plantilla.component';
import { SharedModule } from '../shared/shared-module.module';




@NgModule({
  declarations: [
    LogInComponent,
    QuienesSomosComponent,
    LogInPlantillaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    LogInPlantillaComponent
  ]
})
export class LogInModule { }
