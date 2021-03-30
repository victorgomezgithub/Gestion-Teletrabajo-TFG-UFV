import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private clienteService: ClientesService) { }
  showErrorMessage = false;

  registroForm = new FormGroup({
    user: new FormControl(''),
    password: new FormControl(''),
    confirmedPassword: new FormControl(''),
    empresa: new FormControl('')
  });


  onSubmit(): void {
  }

}
