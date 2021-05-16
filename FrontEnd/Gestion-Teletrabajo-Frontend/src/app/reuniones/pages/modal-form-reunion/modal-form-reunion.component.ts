import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Empleado } from '../../../log-in/interfaces/logIn.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../../../log-in/services/clientes.service';
import { ActivatedRoute } from '@angular/router';
import { ReunionesService } from '../../services/reuniones.service';

@Component({
  selector: 'app-modal-form-reunion',
  templateUrl: './modal-form-reunion.component.html',
  styleUrls: ['./modal-form-reunion.component.css']
})
export class ModalFormReunionComponent {

  closeResult = '';
  empleadosTotales: Empleado[]  = [];
  integrantesReunion: number[] = [];
  public id: string;
  uploadFiles: any[] = [];


  // tslint:disable-next-line:max-line-length
  constructor(private cd: ChangeDetectorRef, private empleadoService: ClientesService, private modalService: NgbModal, private reunionesService: ReunionesService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.integrantesReunion.push(+this.id);
    const reunionesPorEmpleado: Observable<Empleado[]> = this.empleadoService.cargarEmpleadosDeUnaEmpresa(this.id);
    reunionesPorEmpleado.subscribe((resp) => {
      console.log(resp);
      this.empleadosTotales = [...resp];
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
      console.log(this.closeResult);
      if (result === 'Save click') {
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
        nuevoEmpleado.subscribe((resp) => {
          if (resp) {
            const reunionesPorEmpleado: Observable<Empleado[]> = this.empleadoService.cargarEmpleadosDeUnaEmpresa(this.id);
            reunionesPorEmpleado.subscribe((response) => {
              console.log(response);
              this.empleadosTotales = [...response];
            });
          }
        });
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
    this.addReunionForm.controls.integrante.reset();
  }

  handleUpload(files): void {
    // const file = files.item(0);
    // console.log("file");
    this.uploadFiles.push('file');
  }
}
