import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }
  private servicioUrl = 'https://gestionteletrabajobackend.herokuapp.com/empresas';


  cargarEmpresa(id: string): Observable<any> {
    const params = new HttpParams().set('idEmpleado', id);
    return this.http.get<any>(`${this.servicioUrl}/findEmpresa`, { params });
  }

}
