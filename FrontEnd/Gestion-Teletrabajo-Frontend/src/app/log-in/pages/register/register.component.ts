import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private clienteService: ClientesService, private router: Router) { }
  showErrorMessage = false;

  registroForm = new FormGroup({
    user: new FormControl(''),
    password: new FormControl(''),
    confirmedPassword: new FormControl(''),
    empresa: new FormControl('')
  });


  onSubmit(): void {
    this.showErrorMessage = false;
    const controls = this.registroForm.controls;
    if (this.checkForEmptyValuesinForm()) {
      console.log(controls.user.value);
      this.clienteService.registrarEmpleado(controls.user.value, controls.password.value, controls.empresa.value);
      if (this.clienteService.empleado.id != null) {
        console.log('Registrado');
        this.router.navigate(['']);
      } else {
        this.showErrorMessage = true;
        console.log(this.clienteService.empleado);
      }
    } else {
      console.log('Algun campo esta vacío');
    }
  }




  checkForEmptyValuesinForm(): boolean {
    if (this.registroForm.controls.user.value !== '' && this.registroForm.controls.password.value !== ''
      && this.registroForm.controls.confirmedPassword.value !== '' && this.registroForm.controls.empresa.value !== '') {
      return true;
    }

    return false;

  }


}
