import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';

@Injectable({
  providedIn: 'root'
})
export class ReunionesService {


  constructor(private http: HttpClient) { }

  private servicioUrl = 'https://gestionteletrabajobackend.herokuapp.com/reuniones';


  cargarReunionesEmpleado(id: string): Observable<any[]> {
    const params = new HttpParams().set('idEmpleado', id);
    return this.http.get<any[]>(`${this.servicioUrl}/findReunionesEmpleado`, { params });
  }


  nuevaReunion(parametrosReunion: any): Observable<any[]> {
    const params = new HttpParams().set('parametrosReunion', JSON.stringify(parametrosReunion));
    return this.http.post<any[]>(`${this.servicioUrl}/nuevaReunion`, { params });
  }


  deleteReunion(idReunion: string): Observable<any[]> {
    const params = new HttpParams().set('idReunion', idReunion);
    return this.http.post<any[]>(`${this.servicioUrl}/deleteReunion`, { params });
  }
}
