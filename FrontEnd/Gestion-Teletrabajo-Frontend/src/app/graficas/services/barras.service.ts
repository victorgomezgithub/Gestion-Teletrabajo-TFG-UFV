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

  deleteReunion(): Observable<any[]> {
    return this.http.get<any[]>(`${this.servicioUrl}/findGraficaReusTot`, {  });
  }
}
