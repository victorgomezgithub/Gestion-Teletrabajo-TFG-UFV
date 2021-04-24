import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { Observable } from 'rxjs';
import { Empleado } from '../../interfaces/logIn.interface';
import { PasswordCheckService } from '../../services/password.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  showErrorMessage = false;
  messageOut = '';
  constructor(private clienteService: ClientesService, private router: Router, private checkPassword: PasswordCheckService) { }
  registroForm = new FormGroup({
    nombreCompleto: new FormControl(''),
    user: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmedPassword: new FormControl(''),
    horarioEntrada: new FormControl(''),
    horarioSalida: new FormControl(''),
    empresa: new FormControl(''),
    equipo: new FormControl('')
  });


  onSubmit(): void {
    this.showErrorMessage = false;
    const controls = this.registroForm.controls;
    if (this.checkForEmptyValuesinForm()) {
          if (this.checkForSamePasswords()) {
            if (this.checkPassword.checkPasswordStrength(controls.password.value) > 2) {
              this.registrarUsuario(controls);
            } else {
              this.showErrorMessage = true;
              this.messageOut = 'Las contraseñas deben contener: minúsculas, mayúsculas y números';
            }
          } else {
            this.showErrorMessage = true;
            this.messageOut = 'Las contraseñas deben coincidir';
          }
        } else {
          this.showErrorMessage = true;
          this.messageOut = 'Todos los campos deben estar rellenos';
        }
  }




  public registrarUsuario(controls): void {
    const observableRegistro: Observable<Empleado> =
      // tslint:disable-next-line:max-line-length
      this.clienteService.registrarEmpleado(controls.nombreCompleto.value, controls.user.value, controls.email.value, controls.password.value,  controls.horarioEntrada.value, controls.horarioSalida.value, controls.empresa.value, controls.equipo.value);
    observableRegistro.subscribe((resp) => {
      if (resp) {
        this.router.navigate(['']);
      }
    });
  }

  private checkForEmptyValuesinForm(): boolean {
    return this.registroForm.controls.user.value !== '' && this.registroForm.controls.password.value !== ''
      && this.registroForm.controls.confirmedPassword.value !== '' && this.registroForm.controls.empresa.value !== '';
  }

  private checkForSamePasswords(): boolean {
    return this.registroForm.controls.password.value === this.registroForm.controls.confirmedPassword.value;
  }

}
