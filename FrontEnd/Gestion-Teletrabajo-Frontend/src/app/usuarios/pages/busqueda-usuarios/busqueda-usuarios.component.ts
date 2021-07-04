import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ClientesService } from '../../../log-in/services/clientes.service';
import { Empleado } from '../../../log-in/interfaces/logIn.interface';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-busqueda-usuarios',
  templateUrl: './busqueda-usuarios.component.html',
  styleUrls: ['./busqueda-usuarios.component.css']
})
export class BusquedaUsuariosComponent implements OnInit{

  empleadosTotales: Empleado[] = [];
  public id: string;
  public rol: string;
  subscription: Subscription;
  messages: any[] = [];

  // tslint:disable-next-line:max-line-length
  constructor(private usuariosService: UsuariosService, private router: Router, private cd: ChangeDetectorRef, private empleadoService: ClientesService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.rol = localStorage.getItem('rol');


    if (localStorage.getItem('auth') !== ('autentificado_' + this.id)) {
      this.router.navigate(['/']);
    }

    this.subscription = this.usuariosService.getMessage().subscribe(message => {
      if (message) {
        this.messages.push(message);
        this.ngOnInit();
      } else {
        this.messages = [];
      }
    });

  }

  ngOnInit(): void {
    this.cd.detectChanges();

    const empleadosEmpresa: Observable<Empleado[]> = this.empleadoService.cargarEmpleadosDeUnaEmpresa(this.id);
    empleadosEmpresa.subscribe((resp) => {
      this.empleadosTotales = [...resp];
      console.log(this.empleadosTotales);
      this.cd.detectChanges();
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
