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


@Component({
  selector: 'app-modal-form-reunion',
  templateUrl: './modal-form-reunion.component.html',
  styleUrls: ['./modal-form-reunion.component.css']
})
export class ModalFormReunionComponent {

  closeResult = '';
  empleadosTotales: Empleado[]  = [];
  integrantesReunion: number[] = [];
  nombresEmpleado: string[] = [];
  public id: string;
  uploadFiles: any[] = [];
  isGuardar = false;
  mensajes: Reunion[] = [];
  ALERTSOBL: Alert[] = [];
  ALERTSAVI: Alert[] = [];

  // tslint:disable-next-line:max-line-length
  constructor(public alertService: AlertService, private cd: ChangeDetectorRef, private empleadoService: ClientesService, private modalService: NgbModal, private reunionesService: ReunionesService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.integrantesReunion.push(+this.id);
    const reunionesPorEmpleado: Observable<Empleado[]> = this.empleadoService.cargarEmpleadosDeUnaEmpresa(this.id);
    reunionesPorEmpleado.subscribe((resp) => {
      console.log(resp);
      this.empleadosTotales = [...resp];
      this.empleadosTotales.forEach(element => {
        if (element.id === +this.id) {
          this.nombresEmpleado.push(element.nombre);
        }
      });
      this.cd.markForCheck();
    });
  }

  addReunionForm = new FormGroup({
    titulo: new FormControl('', Validators.minLength(1)),
    descripcion: new FormControl(''),
    fechaInicio: new FormControl(''),
    fechaFin: new FormControl(''),
    files: new FormControl(''),
    integrante: new FormControl('')
  });


  open(content): any {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'Save click') {
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
    console.log(this.addReunionForm.controls.integrante.value);
    this.integrantesReunion.push(this.empleadosTotales[this.addReunionForm.controls.integrante.value - 1].id);
    this.nombresEmpleado.push(this.empleadosTotales[this.addReunionForm.controls.integrante.value - 1].nombre);
    this.addReunionForm.controls.integrante.reset();
  }

  handleUpload(files): void {
    const file = files.item(0);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.uploadFiles.push(reader.result);
    };
  }

  guardar(modal: any): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const controls = this.addReunionForm.controls;
    const parametrosReunion: any = {};
    parametrosReunion.creador = this.id;
    parametrosReunion.title = controls.titulo.value;
    parametrosReunion.description = controls.descripcion.value;
    parametrosReunion.fechaInicio = controls.fechaInicio.value;
    parametrosReunion.fechaFin = controls.fechaFin.value;
    parametrosReunion.files = this.uploadFiles;
    parametrosReunion.integrantes = this.integrantesReunion;

    const nuevoEmpleado: Observable<any[]> = this.reunionesService.nuevaReunion(parametrosReunion);
    this.cd.detectChanges();
    nuevoEmpleado.subscribe((resp) => {
      if (resp) {
        this.mensajes = [...resp];
        this.procesarMensajes();
        if (!this.isMensajesObligatorios()) {
          const reunionesPorEmpleado: Observable<Empleado[]> = this.empleadoService.cargarEmpleadosDeUnaEmpresa(this.id);
          reunionesPorEmpleado.subscribe((response) => {
            this.empleadosTotales = [...response];
            this.cd.checkNoChanges();
            modal.close('Save click');
          });
        }
        this.cd.markForCheck();
      }
    });
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


  close(alert: Alert): void {
    this.ALERTSOBL.splice(this.ALERTSOBL.indexOf(alert), 1);
  }
}
