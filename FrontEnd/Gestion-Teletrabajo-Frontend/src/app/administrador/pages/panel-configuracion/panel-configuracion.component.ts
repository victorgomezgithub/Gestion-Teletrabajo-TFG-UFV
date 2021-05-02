import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ConfiguracionService } from '../../services/configuraciones.service';
import { Configuracion } from '../../interfaces/configuracion.interface';
import { ActivatedRoute } from '@angular/router';
import { isConstructorDeclaration } from 'typescript';

@Component({
  selector: 'app-panel-configuracion',
  templateUrl: './panel-configuracion.component.html',
  styleUrls: ['./panel-configuracion.component.css']
})
export class PanelConfiguracionComponent implements OnInit{


   formArray = new FormArray([
    new FormGroup({
      parametro: new FormControl(''),
      obligatoriedad: new FormControl('')
    }),
    new FormGroup({
      parametro: new FormControl(''),
      obligatoriedad: new FormControl('')
    })
 ]);

  configuraciones: Configuracion[] = [];
  public id: string;

  constructor(private configuracionService: ConfiguracionService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    const observableConfiguracion = this.configuracionService.cargarConfiguraciones(this.id);
    observableConfiguracion.subscribe((resp) => {
      if (resp) {
        this.configuraciones = [...resp];
        console.log(resp);
      }
    });
  }

  onClick(): void {
    this.formArray.controls.forEach((formGroup, index) => {
      this.configuraciones[index].parametro = formGroup.value.parametro;
      this.configuraciones[index].parametro = formGroup.value.obligatoriedad;
  });

    const updateConfiguraciones = this.configuracionService.guardarConfiguraciones(this.configuraciones);

    updateConfiguraciones.subscribe((resp) => {
      if (resp) {
        console.log('Funciono?');
      }
    });
  }
}