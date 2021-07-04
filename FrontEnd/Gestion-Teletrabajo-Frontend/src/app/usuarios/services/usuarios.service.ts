import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {



  private subject = new Subject<any>();

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
