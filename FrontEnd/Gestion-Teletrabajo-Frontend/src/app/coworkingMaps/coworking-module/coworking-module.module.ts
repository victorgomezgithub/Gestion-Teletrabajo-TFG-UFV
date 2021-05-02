import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoworkingMapComponent } from './pages/coworking-map/coworking-map.component';
import { SharedModule } from '../../shared/shared-module.module';
import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [
    CoworkingMapComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyA1EdunBrL7mcSbyZ6_1Yg7DZmDeJFpY00'})
  ],
  exports: [
    CoworkingMapComponent
  ]
})
export class CoworkingModuleModule { }
