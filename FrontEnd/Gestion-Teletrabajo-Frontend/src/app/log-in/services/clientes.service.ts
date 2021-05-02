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
  }


  // tslint:disable-next-line:max-line-length
  registrarEmpleado(nombreCompleto: string, username: string,  email: string, password: string, horarioEntrada: string, horarioSalida: string, empresa: string, equipo: string): Observable<Empleado> {
    // tslint:disable-next-line:max-line-length
    const params = new HttpParams().set('nombre', nombreCompleto).set('username', username).set('email', email).set('password', password).set('rol', 'administrador').set('nombreEmpresa', empresa).set('horaEntrada', horarioEntrada).set('horaSalida', horarioSalida).set('equipo', equipo);
    return this.http.post<Empleado>(`${this.servicioUrl}/registerEmpleado`,  params );
  }


  cargarEmpleadosDeUnaEmpresa(idEmpleado: string): Observable<Empleado[]> {
    const params = new HttpParams().set('idEmpleado', idEmpleado);
    return this.http.get<Empleado[]>(`${this.servicioUrl}/getEmpleadosEmpresa`,  { params } );
  }

  // tslint:disable-next-line:max-line-length
  anadirUsuario(idEmpleado: string, nombreCompleto: string, username: string,  email: string, password: string, rol: string, horarioEntrada: string, horarioSalida: string, equipo: string): Observable<Empleado> {

    // tslint:disable-next-line:max-line-length
    const params = new HttpParams().set('idEmpleado', idEmpleado).set('nombre', nombreCompleto).set('username', username).set('email', email).set('password', password).set('horaEntrada', horarioEntrada).set('rol', rol).set('horaSalida', horarioSalida).set('equipo', equipo);

    return this.http.post<Empleado>(`${this.servicioUrl}/anadirUsuario`,  params );
  }

}
