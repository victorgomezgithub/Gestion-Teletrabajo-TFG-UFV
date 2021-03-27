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


  loginForm = new FormGroup({
    user: new FormControl(''),
    password: new FormControl(''),
  });


  onSubmit(): void {
    console.log(this.loginForm.controls.user.value);
    this.clienteService.cargarEmpleado(this.loginForm.controls.user.value);
    console.log(this.clienteService.getEmpleado());
  }


}
