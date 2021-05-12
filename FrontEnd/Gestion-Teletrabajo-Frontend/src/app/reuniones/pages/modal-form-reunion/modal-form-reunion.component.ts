import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Empleado } from '../../../log-in/interfaces/logIn.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientesService } from '../../../log-in/services/clientes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal-form-reunion',
  templateUrl: './modal-form-reunion.component.html',
  styleUrls: ['./modal-form-reunion.component.css']
})
export class ModalFormReunionComponent {

  closeResult = '';

  constructor(private modalService: NgbModal, private clienteService: ClientesService, private route: ActivatedRoute) { }
  public id: string;

  addUserForm = new FormGroup({
    nombreCompleto: new FormControl(''),
    rol: new FormControl(''),
    user: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmedPassword: new FormControl(''),
    horarioEntrada: new FormControl(''),
    horarioSalida: new FormControl(''),
    equipo: new FormControl('')
  });


  open(content): any {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
      if (result === 'Save click') {
        this.id = this.route.snapshot.paramMap.get('id');
        const controls = this.addUserForm.controls;
        console.log(controls.rol.value);
        // tslint:disable-next-line:max-line-length
        const nuevoEmpleado: Observable<Empleado> = this.clienteService.anadirUsuario(this.id, controls.nombreCompleto.value, controls.user.value, controls.email.value, controls.password.value, controls.rol.value, controls.horarioEntrada.value, controls.horarioSalida.value, controls.equipo.value);
        nuevoEmpleado.subscribe((resp) => {
          if (resp) {
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

}
