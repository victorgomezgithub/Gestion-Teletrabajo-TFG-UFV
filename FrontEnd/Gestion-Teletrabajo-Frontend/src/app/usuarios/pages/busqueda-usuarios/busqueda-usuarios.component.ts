import { Component } from '@angular/core';
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

  empleadosFiltrados: Empleado[];
  empleadosTotales: Empleado[];

  constructor(private empleadoService: ClientesService) {
    const empleadosEmpresa: Observable<Empleado[]>  = this.empleadoService.cargarEmpleadosDeUnaEmpresa('Atmira');
    empleadosEmpresa.subscribe((resp) => {
      console.log(resp);
      this.empleadosFiltrados = resp;
      this.empleadosTotales = resp;
    });
   }

  searchForm = new FormGroup({
    filtradoPorNombre: new FormControl('')
  });

  onChange(): void {
    this.empleadosTotales.forEach((empleado) => {
      this.empleadosFiltrados.length = 0;
      console.log(empleado.username);
      console.log(this.searchForm.controls.filtradoPorNombre);
      if (empleado.username === this.searchForm.controls.filtradoPorNombre.value){
        this.empleadosFiltrados.push(empleado);
      }
    });
  }

}
