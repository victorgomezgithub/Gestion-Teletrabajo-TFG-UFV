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


   formArray = new FormArray([]);

  configuraciones: Configuracion[] = [];
  public id: string;

  constructor(private configuracionService: ConfiguracionService, private route: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    const observableConfiguracion = this.configuracionService.cargarConfiguraciones(this.id);
    observableConfiguracion.subscribe((resp) => {
      if (resp) {
        this.configuraciones = [...resp];
        this.configuraciones.forEach(() => {
          this.formArray.push(new FormGroup({parametro: new FormControl(''), obligatoriedad: new FormControl('')}));
        });
      }
    });
  }

  onClick(): void {
    this.formArray.controls.forEach((formGroup, index) => {
      if (formGroup.value.parametro && formGroup.value.obligatoriedad) {
      this.configuraciones[index].parametro = formGroup.value.parametro;
      this.configuraciones[index].obligatoriedad = formGroup.value.obligatoriedad;
      }
  });

    const updateConfiguraciones = this.configuracionService.guardarConfiguraciones(this.configuraciones);

    updateConfiguraciones.subscribe((resp) => {
    });
  }
}
