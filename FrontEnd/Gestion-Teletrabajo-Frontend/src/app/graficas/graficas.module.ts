import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarrasComponent } from './pages/barras/barras.component';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared-module.module';



@NgModule({
  declarations: [
    BarrasComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    SharedModule
  ],
  exports: [
    BarrasComponent
  ]
})
export class GraficasModule { }
