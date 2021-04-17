import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../log-in/services/clientes.service';
import { Empleado } from '../../../log-in/interfaces/logIn.interface';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-busqueda-usuarios',
  templateUrl: './busqueda-usuarios.component.html',
  styleUrls: ['./busqueda-usuarios.component.css']
})
export class BusquedaUsuariosComponent {

  empleadosTotales: Empleado[] = [];

  constructor(private empleadoService: ClientesService) {
    const empleadosEmpresa: Observable<Empleado[]> = this.empleadoService.cargarEmpleadosDeUnaEmpresa('Atmira');
    empleadosEmpresa.subscribe((resp) => {
      console.log(resp);
      this.empleadosTotales = [...resp];
    });
  }
}
