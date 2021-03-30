import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Empleado } from '../interfaces/logIn.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }
  private empleadoBuscado: Empleado;
  private servicioUrl = 'http://localhost:8080';

  get empleado(): Empleado {
    return {...this.empleadoBuscado};
  }


  cargarEmpleado(name: string, password: string): void {
    const params = new HttpParams().set('username', name).set('password', password);

    this.http.get<Empleado>(`${this.servicioUrl}/empleado`, { params })
      .subscribe((resp) => {
         return this.empleadoBuscado = resp;
      });
  }

}
