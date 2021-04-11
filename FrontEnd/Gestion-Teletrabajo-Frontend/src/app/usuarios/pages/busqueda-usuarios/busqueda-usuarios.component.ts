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

  empleadosFiltrados: Empleado[] = [];
  empleadosTotales: Empleado[] = [];

  constructor(private empleadoService: ClientesService) {
    const empleadosEmpresa: Observable<Empleado[]> = this.empleadoService.cargarEmpleadosDeUnaEmpresa('Atmira');
    empleadosEmpresa.subscribe((resp) => {
      this.empleadosTotales = [...resp];
      this.empleadosFiltrados = [...resp];
    });
  }

  searchForm = new FormGroup({
    filtradoPorNombre: new FormControl('')
  });

  onChange(): void {
    if (this.searchForm.controls.filtradoPorNombre.value !== '') {
      this.empleadosFiltrados = [];
      this.empleadosTotales.forEach((empleado) => {
        if (empleado.username.includes(this.searchForm.controls.filtradoPorNombre.value)) {
          this.empleadosFiltrados.push(empleado);
        }
      });
    } else {
      this.empleadosFiltrados = [...this.empleadosTotales];
    }
  }

}
