import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  constructor(private clienteService: ClientesService) { }
  showErrorMessage = false;

  loginForm = new FormGroup({
    user: new FormControl(''),
    password: new FormControl(''),
  });


  onSubmit(): void {
    this.showErrorMessage = false;
    if (this.loginForm.controls.user.value !== '') {
      this.clienteService.cargarEmpleado(this.loginForm.controls.user.value, this.loginForm.controls.password.value);
      if (this.clienteService.empleado.id != null) {
        console.log('Logeado');
      } else {
        this.showErrorMessage = true;
        console.log(this.clienteService.empleado);
      }
    }
  }


}
