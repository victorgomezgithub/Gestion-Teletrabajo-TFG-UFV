import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuracion } from '../interfaces/configuracion.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  constructor(private http: HttpClient) { }
  private servicioUrl = 'http://localhost:8080/configuracion';


  cargarConfiguraciones(idEmpleado: string): Observable<Configuracion[]> {
    const params = new HttpParams().set('idEmpleado', idEmpleado);
    return this.http.get<Configuracion[]>(`${this.servicioUrl}/findConfiguracion`, { params });
  }

  guardarConfiguraciones(configuracionesParametro: Configuracion[]): Observable<Configuracion[]> {

    const configuraciones = JSON.stringify(configuracionesParametro);
    const params = new HttpParams().set('configuraciones', configuraciones);
    return this.http.post<Configuracion[]>(`${this.servicioUrl}/modificacionConfiguracion`, { params });
  }

}
