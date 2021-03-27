import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Empleado } from '../interfaces/logIn.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }
  private empleado: Empleado;
  private servicioUrl = 'http://localhost:8080';


  getEmpleado(): Empleado {
    return this.empleado;
  }


  cargarEmpleado(name: string): void {
    const params = new HttpParams().set('name', name);

    this.http.get<Empleado>(`${this.servicioUrl}/empleado`, { params })
      .subscribe((resp) => {
        console.log(resp);
        this.empleado = resp;
      });
  }

}
