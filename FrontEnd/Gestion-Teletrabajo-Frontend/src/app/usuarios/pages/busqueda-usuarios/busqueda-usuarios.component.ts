import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ClientesService } from '../../../log-in/services/clientes.service';
import { Empleado } from '../../../log-in/interfaces/logIn.interface';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-busqueda-usuarios',
  templateUrl: './busqueda-usuarios.component.html',
  styleUrls: ['./busqueda-usuarios.component.css']
})
export class BusquedaUsuariosComponent {

  empleadosTotales: Empleado[] = [];
  public id: string;

  constructor(private cd: ChangeDetectorRef, private empleadoService: ClientesService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    const empleadosEmpresa: Observable<Empleado[]> = this.empleadoService.cargarEmpleadosDeUnaEmpresa(this.id);
    empleadosEmpresa.subscribe((resp) => {
      console.log(resp);
      this.empleadosTotales = [...resp];
      cd.detectChanges();
    });
  }

  borrarEmpleado(idEmpleado: string): any {
    const empleadosEmpresa: Observable<Empleado> = this.empleadoService.borrarUsuario(idEmpleado);
    empleadosEmpresa.subscribe((resp) => {
      if (resp) {
        for (const [index, empleado] of this.empleadosTotales.entries()) {
          if (resp.id === empleado.id) {
            this.empleadosTotales.splice(index, 1);
            this.cd.detectChanges();
          }
        }
      }
    });
  }
}
