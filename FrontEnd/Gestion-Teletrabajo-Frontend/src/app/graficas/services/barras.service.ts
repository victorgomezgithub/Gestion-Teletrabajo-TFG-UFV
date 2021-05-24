import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';

@Injectable({
  providedIn: 'root'
})
export class BarrasService {


  constructor(private http: HttpClient) { }

  private servicioUrl = 'http://localhost:8080/analisis';

  getReunionesTot(): Observable<any[]> {
    return this.http.get<any[]>(`${this.servicioUrl}/findGraficaReusTot`, {  });
  }

  getEmpleadosPorReu(): Observable<any[]> {
    return this.http.get<any[]>(`${this.servicioUrl}/findEmpleadosPorReu`, {  });
  }

  getConfTipos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.servicioUrl}/findConfigStats`, {  });
  }
}
