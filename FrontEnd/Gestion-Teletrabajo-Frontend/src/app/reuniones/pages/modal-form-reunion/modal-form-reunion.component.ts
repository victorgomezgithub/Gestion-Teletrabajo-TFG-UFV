import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Empleado } from '../../../log-in/interfaces/logIn.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../../../log-in/services/clientes.service';
import { ActivatedRoute } from '@angular/router';
import { ReunionesService } from '../../services/reuniones.service';
import { Reunion, Alert } from '../../interfaces/reuniones.interface';
import { AlertService } from 'alert-service';
import { CoworkingService } from '../../../coworkingMaps/coworking-module/services/coworking.service';
import { Coworking } from '../../../coworkingMaps/coworking-module/interfaces/coworking';


@Component({
  selector: 'app-modal-form-reunion',
  templateUrl: './modal-form-reunion.component.html',
  styleUrls: ['./modal-form-reunion.component.css']
})
export class ModalFormReunionComponent implements OnInit{

  reunionGuarada = false;
  closeResult = '';
  empleadosTotales: Empleado[]  = [];
  empleadosTotalesSinUtilizar: Empleado[]  = [];
  integrantesReunion: number[] = [];
  nombresEmpleado: string[] = [];
  public id: string;
  uploadedFile: string[] = [];
  isGuardar = false;
  mensajes: Reunion[] = [];
  ALERTSOBL: Alert[] = [];
  ALERTSAVI: Alert[] = [];
  coworkingEmpresa: Coworking[] = [];

  // tslint:disable-next-line:max-line-length
  constructor(public alertService: AlertService, private coworkingService: CoworkingService , private cd: ChangeDetectorRef, private empleadoService: ClientesService, private modalService: NgbModal, private reunionesService: ReunionesService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.integrantesReunion.push(+this.id);
    const reunionesPorEmpleado: Observable<Empleado[]> = this.empleadoService.cargarEmpleadosDeUnaEmpresa(this.id);
    reunionesPorEmpleado.subscribe((resp) => {
      console.log(resp);
      this.empleadosTotales = [...resp];
      this.empleadosTotalesSinUtilizar = [...resp];
      this.empleadosTotales.forEach(element => {
        if (element.id === +this.id) {
          this.nombresEmpleado.push(element.nombre);
        }
      });
      this.cd.markForCheck();
    });

    const coworkings: Observable<Coworking[]> = this.coworkingService.cargarCoworkingEmpleado(this.id);
    coworkings.subscribe((resp) => {
      console.log(resp);
      this.coworkingEmpresa = [...resp];
      });
    this.cd.markForCheck();
  }
  addReunionForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    fechaInicio: new FormControl('', Validators.required),
    fechaFin: new FormControl('', Validators.required),
    files: new FormControl(''),
    integrante: new FormControl(''),
    coworking: new FormControl('')
  });

  ngOnInit(): void {

  }

  sendMessage(): void {
    this.reunionesService.sendMessage('Nueva Reunion');
  }

  open(content): any {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.addReunionForm.reset();
    this.nombresEmpleado = [];
    this.integrantesReunion = [];
    this.integrantesReunion.push(+this.id);
    this.reunionGuarada = false;
    this.ALERTSAVI = [];
    this.ALERTSOBL = [];
    this.empleadosTotalesSinUtilizar = [...this.empleadosTotales];
    this.uploadedFile = [];
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  addCourse(): void{
    this.integrantesReunion.push(this.empleadosTotalesSinUtilizar[this.addReunionForm.controls.integrante.value].id);
    this.nombresEmpleado.push(this.empleadosTotalesSinUtilizar[this.addReunionForm.controls.integrante.value].nombre);
    this.empleadosTotalesSinUtilizar.splice(this.addReunionForm.controls.integrante.value, 1);
    this.addReunionForm.controls.integrante.reset();
  }

  handleUpload(files): void {
    const file = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.uploadedFile.push(reader.result.toString() + 'filename' + file.name.split('.')[0] + 'OTROELEMENTO');
    };
  }

  guardar(modal: any): void {
    let camposCorrectos = true;
    this.id = this.route.snapshot.paramMap.get('id');
    const controls = this.addReunionForm.controls;
    const parametrosReunion: any = {};
    parametrosReunion.creador = this.id;
    parametrosReunion.title = controls.titulo.value;
    parametrosReunion.description = controls.descripcion.value;
    parametrosReunion.fechaInicio = controls.fechaInicio.value;
    parametrosReunion.fechaFin = controls.fechaFin.value;
    parametrosReunion.file = this.uploadedFile;
    parametrosReunion.integrantes = this.integrantesReunion;
    parametrosReunion.idCoworking = controls.coworking.value;
    const nuevoEmpleado: Observable<any[]> = this.reunionesService.nuevaReunion(parametrosReunion);
    console.log(parametrosReunion);
    // tslint:disable-next-line:max-line-length
    if (parametrosReunion.fechaInicio === null || parametrosReunion.fechaFin === null || parametrosReunion.title === null  || parametrosReunion.description === null) {
      this.ALERTSOBL.push({type: 'danger', message: 'Campos obligatorios sin rellenar'});
      camposCorrectos = false;
    } else {
      if (Date.parse(parametrosReunion.fechaInicio) > Date.parse(parametrosReunion.fechaFin)) {
        this.ALERTSOBL.push({type: 'danger', message: 'La fecha de fin debe ser despues de la fecha de inicio'});
        camposCorrectos = false;
      }
    }

    this.cd.detectChanges();
    if (camposCorrectos) {
    nuevoEmpleado.subscribe((resp) => {
      if (resp) {
        this.mensajes = [...resp];
        this.procesarMensajes();
        if (!this.isMensajesObligatorios()) {
          this.sendMessage();
          this.reunionGuarada = true;
          const reunionesPorEmpleado: Observable<Empleado[]> = this.empleadoService.cargarEmpleadosDeUnaEmpresa(this.id);
          reunionesPorEmpleado.subscribe((response) => {
            this.empleadosTotales = [...response];
            this.cd.detectChanges();
            modal.close('Save click');
          });
        }
        this.cd.detectChanges();
      }
    });
  }
  }

  procesarMensajes(): void {
    this.mensajes.forEach((element) => {
      if (element.obligatorio) {
        const alerta: Alert = {type: 'danger', message: element.mensaje};
        this.ALERTSOBL.push(alerta);
      } else {
        const alerta: Alert = {type: 'warning', message: element.mensaje};
        this.ALERTSAVI.push(alerta);
      }
    });
    this.cd.detectChanges();
  }

  isMensajesObligatorios(): boolean {
    let mensajeObligatorio = false;
    this.mensajes.forEach((element) => {
      if (element.obligatorio) {
        mensajeObligatorio = true;
        return;
      }
    });
    return mensajeObligatorio;
  }


  closeObl(alert: number): void {
    this.ALERTSOBL.splice(alert, 1);
  }

  closeAvi(alert: number): void {
    this.ALERTSAVI.splice(alert, 1);
  }
}
