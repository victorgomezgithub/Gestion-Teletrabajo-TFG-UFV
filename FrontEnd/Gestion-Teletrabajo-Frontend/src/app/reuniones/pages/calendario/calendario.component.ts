import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, ChangeDetectorRef, Injectable, Input, OnDestroy } from '@angular/core';
import { isSameDay, isSameMonth, } from 'date-fns';
import { Subject, Observable, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, } from 'angular-calendar';
import { ActivatedRoute, Router } from '@angular/router';
import { ReunionesService } from '../../services/reuniones.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendario',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['calendario.component.css'],
  templateUrl: 'calendario.component.html',
})
@Injectable({
  providedIn: 'root',
})
export class CalendarioComponent implements OnInit, OnDestroy {
    @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  subscription: Subscription;
  messages: any[] = [];

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log(event);
        const borrarReunion =  this.reunionService.deleteReunion((event as any).idReunion);
        borrarReunion.subscribe((resp) => {
          if (resp) {
            this.events = this.events.filter((iEvent) => iEvent !== event);
            this.handleEvent('Deleted', event);
            this.cd.detectChanges();
          }
        });

      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: any[] = [];

  activeDayIsOpen = true;

  public id: string;

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private modal: NgbModal, private route: ActivatedRoute, private reunionService: ReunionesService, private cd: ChangeDetectorRef) {
    this.id = this.route.snapshot.paramMap.get('id');

    if (localStorage.getItem('auth') !== ('autentificado_' + this.id)) {
      this.router.navigate(['/']);
    }

    this.subscription = this.reunionService.getMessage().subscribe(message => {
      if (message) {
        this.messages.push(message);
        this.ngOnInit();
      } else {
        this.messages = [];
      }
    });


  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const reuniones = this.reunionService.cargarReunionesEmpleado(this.id);
    console.log('paso');
    if (reuniones){
      reuniones.subscribe((resp) => {
        if (resp) {
          console.log('Reuniones');
          console.log(resp);
          this.events = [...resp];
          console.log(this.events);
          this.events.forEach(element => {
            element.start = new Date(element.startDate);
            element.end = new Date(element.endDate);
            element.actions = this.actions;
            getFilesProcesados(element.documento).then(res => element.files = res).catch(err => console.log(err));

          });

          this.cd.detectChanges();
        }
      });
    }
  }

  ngOnDestroy(): void {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    console.log(this.modalData);
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  setView(view: CalendarView): void {
    this.view = view;
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }


  downloadPdf(base64String: string[]): any {
    console.log(base64String);
    base64String.forEach((element) => {
      console.log(element);
      const source = `${element.split('filename')[0]}`;
      console.log(source);
      const link = document.createElement('a');
      link.href = source;

      link.download = `${element.split('filename')[1]}.${element.split(';base64')[0].split('/')[1]}`;
      console.log(element.split('filename')[1]);
      console.log(element.split(';base64')[0].split('/')[1]);
      link.click();
    });
  }
}
async function getFilesProcesados(documento: string): Promise<string[]> {
  console.log('ENTRO');
  documento = documento.split('[')[1].split(']')[0];
  let hayMasArchivos = true;
  const archivosTot: string[] = [];
  while (hayMasArchivos) {
    if (documento.split('OTROELEMENTO,').length > 1) {
      console.log('IF');

      archivosTot.push(documento.split('OTROELEMENTO,')[0]);
      console.log(documento);

      documento = documento.split('OTROELEMENTO,')[1];
      console.log(documento);
    } else {
      console.log('ELSE');

      archivosTot.push(documento.split('OTROELEMENTO')[0]);
      hayMasArchivos = false;
      return archivosTot;

    }
  }
}

