import { Marker } from '@agm/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coworking } from '../interfaces/coworking';

@Injectable({
  providedIn: 'root'
})
export class CoworkingService {


  constructor(private http: HttpClient) { }

  private servicioUrl = 'http://localhost:8081/coworking';


  cargarCoworkingEmpleado(id: string): Observable<Coworking[]> {
    const params = new HttpParams().set('idEmpleado', id);
    return this.http.get<Coworking[]>(`${this.servicioUrl}/getCoworkingEmpresa`, { params });
  }

  deleteCoworking(id: number): Observable<any> {
    const params = new HttpParams().set('idCoworking', id.toString());
    return this.http.delete<any>(`${this.servicioUrl}/deleteCoworking`, { params });
  }

  createCoworking(ejeX: string, ejeY: string, color: string, id: string): Observable<any> {
    // tslint:disable-next-line:max-line-length
    const params = new HttpParams().set('ejeX', ejeX).set('ejeY', ejeY).set('color', color).set('idEmpleado', id).set('descripcion', '').set('direccion', '');
    return this.http.post<any>(`${this.servicioUrl}/newCoworking`,  params );
  }

  updateCoworking(ejeX: string, ejeY: string, id: string, descripcion: string, direccion: string): Observable<any> {
    const params = new HttpParams().set('ejeX', ejeX).set('ejeY', ejeY).set('idCoworking', id).set('descripcion', descripcion).set('direccion', direccion);
    return this.http.post<any>(`${this.servicioUrl}/updateCoworking`,  params );
  }
}
