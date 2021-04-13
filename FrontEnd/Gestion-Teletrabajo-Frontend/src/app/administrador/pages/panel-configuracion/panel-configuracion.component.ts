import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-panel-configuracion',
  templateUrl: './panel-configuracion.component.html',
  styleUrls: ['./panel-configuracion.component.css']
})
export class PanelConfiguracionComponent {

  configuracionForm = new FormGroup({
    duracionReuniones: new FormControl(''),
    respetarHorarios: new FormControl('')
  });

  constructor() { }


  onSubmit(): any {

  }

}
