import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';

@Injectable({
  providedIn: 'root'
})
export class ReunionesService {


  constructor(private http: HttpClient) { }

  private servicioUrl = 'http://localhost:8080/reuniones';
  private subject = new Subject<any>();


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

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
  sendMessage(message: string): void {
    this.subject.next({ text: message });
  }

  clearMessages(): void {
    this.subject.next();
  }


}
