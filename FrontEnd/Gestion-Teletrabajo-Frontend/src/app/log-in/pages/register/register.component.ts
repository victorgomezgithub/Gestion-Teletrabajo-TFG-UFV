import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { Observable } from 'rxjs';
import { Empleado } from '../../interfaces/logIn.interface';
import { PasswordCheckService } from '../../services/password.service';
import { trackByHourSegment } from 'angular-calendar/modules/common/util';

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
    user: new FormControl(''),
    password: new FormControl(''),
    confirmedPassword: new FormControl(''),
    empresa: new FormControl('')
  });


  onSubmit(): void {
    this.showErrorMessage = false;
    const controls = this.registroForm.controls;
    const observableUsername: Observable<Empleado> =
      this.clienteService.registrarEmpleado(controls.user.value, controls.password.value, controls.empresa.value);
    observableUsername.subscribe((resp) => {
      if (!resp) {
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
      } else {
        this.showErrorMessage = true;
        this.messageOut = 'Este username ya está cogido';
      }
    });
  }




  public registrarUsuario(controls): void {
    const observableRegistro: Observable<Empleado> =
      this.clienteService.registrarEmpleado(controls.user.value, controls.password.value, controls.empresa.value);
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
