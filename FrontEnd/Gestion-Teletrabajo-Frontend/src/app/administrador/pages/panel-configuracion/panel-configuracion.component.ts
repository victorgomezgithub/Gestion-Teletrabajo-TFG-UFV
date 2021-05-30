import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ConfiguracionService } from '../../services/configuraciones.service';
import { Configuracion } from '../../interfaces/configuracion.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from '../../../reuniones/interfaces/reuniones.interface';
import { element } from 'protractor';

@Component({
  selector: 'app-panel-configuracion',
  templateUrl: './panel-configuracion.component.html',
  styleUrls: ['./panel-configuracion.component.css']
})
export class PanelConfiguracionComponent implements OnInit{

  alerta: Alert = {type: 'success', message: ''};

  formArray = new FormArray([]);
  guardado = false;
  configuraciones: Configuracion[] = [];
  public id: string;

  constructor(private router: Router, private configuracionService: ConfiguracionService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');

    if (localStorage.getItem('auth') !== ('autentificado_' + this.id) || localStorage.getItem('rol') !== 'administrador') {
      this.router.navigate(['/']);
    }
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    const observableConfiguracion = this.configuracionService.cargarConfiguraciones(this.id);
    observableConfiguracion.subscribe((resp) => {
      if (resp) {
        this.configuraciones = [...resp];
        this.configuraciones.forEach((elem) => {
          const formGroup = new FormGroup({parametro: new FormControl(''), obligatoriedad: new FormControl('')});
          formGroup.controls.parametro.setValue(+elem.parametro);
          formGroup.controls.obligatoriedad.setValue(elem.obligatoriedad);
          this.formArray.push(formGroup);
        });
      }
      console.log(this.formArray);
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
      this.guardado = true;
    });
  }

  close(): any {
    this.guardado = false;
  }
}
