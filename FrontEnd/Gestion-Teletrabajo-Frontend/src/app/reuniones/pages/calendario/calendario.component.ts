import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, } from 'angular-calendar';
import { ActivatedRoute } from '@angular/router';
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
export class CalendarioComponent implements OnInit{
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

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
  constructor(private modal: NgbModal, private route: ActivatedRoute, private reunionService: ReunionesService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const reuniones = this.reunionService.cargarReunionesEmpleado(this.id);

    if (reuniones){
      reuniones.subscribe((resp) => {
        if (resp) {
          console.log('Reuniones');
          console.log(resp);
          this.events = [...resp];

          this.events.forEach(element => {
            element.start = new Date(element.startDate);
            element.end = new Date(element.endDate);
            element.actions = this.actions;
          });

          this.cd.detectChanges();
        }
      });
    }
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
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  setView(view: CalendarView): void {
    this.view = view;
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }
}
