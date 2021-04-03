import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Empleado } from '../interfaces/logIn.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }
  private empleadoBuscado: Empleado;
  private grupoEmpleados: Empleado[];
  private servicioUrl = 'http://localhost:8080/empleados';

  get empleado(): Empleado {
    return {...this.empleadoBuscado};
  }

  get grupoBuscado(): Empleado[] {
    return {...this.grupoEmpleados};
  }


  cargarEmpleado(name: string, password: string): Observable<Empleado> {
    const params = new HttpParams().set('username', name).set('password', password);

    return this.http.get<Empleado>(`${this.servicioUrl}/login`, { params });
     /* .subscribe((resp) => {
         return this.empleadoBuscado = resp;
      });*/
  }


  registrarEmpleado(username: string, password: string, nombreEmpresa: string): void {
    const params = new HttpParams().set('username', username).set('password', password).set('rol', 'A').set('nombreEmpresa', nombreEmpresa);
    this.http.post<Empleado>(`${this.servicioUrl}/registerEmpleado`,  params )
      .subscribe((resp) => {
        return this.empleadoBuscado = resp;
      });
  }


  cargarEmpleadosDeUnaEmpresa(empresa: string): Observable<Empleado[]> {
    const params = new HttpParams().set('empresa', empresa);
    return this.http.get<Empleado[]>(`${this.servicioUrl}/getEmpleadosEmpresa`,  { params } );
  }

}
