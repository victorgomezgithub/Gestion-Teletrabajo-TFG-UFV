import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-olvidado-contrasena',
  templateUrl: './olvidado-contrasena.component.html',
  styleUrls: ['./olvidado-contrasena.component.css']
})
export class OlvidadoContrasenaComponent {


  constructor(private clienteService: ClientesService) { }
  showErrorMessage = false;

  contrasenaForm = new FormGroup({
    email: new FormControl(''),
  });


  onSubmit(): void {
  }

}
