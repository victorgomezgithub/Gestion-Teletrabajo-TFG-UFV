import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';

@Injectable({
  providedIn: 'root'
})
export class ReunionesService {


  constructor(private http: HttpClient) { }

  private servicioUrl = 'http://localhost:8080/reuniones';


  cargarReunionesEmpleado(id: string): Observable<CalendarEvent[]> {
    const params = new HttpParams().set('idEmpleado', id);
    return this.http.get<CalendarEvent[]>(`${this.servicioUrl}/findReunionesEmpleado`, { params });
  }
}
