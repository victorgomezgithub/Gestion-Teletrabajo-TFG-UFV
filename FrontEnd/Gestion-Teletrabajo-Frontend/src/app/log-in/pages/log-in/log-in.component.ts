import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientesService } from '../../services/clientes.service';
import { Empleado } from '../../interfaces/logIn.interface';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  constructor(private clienteService: ClientesService, private router: Router) { }
  showErrorMessage = false;

  loginForm = new FormGroup({
    user: new FormControl(''),
    password: new FormControl(''),
  });


  onSubmit(): void {
    this.showErrorMessage = false;
    const controls = this.loginForm.controls;
    if (this.loginForm.controls.user.value !== '') {
      const empleadoObservable: Observable<Empleado> = this.clienteService.cargarEmpleado(controls.user.value, controls.password.value);

      empleadoObservable.subscribe((resp) => {
        if (resp) {
          localStorage.setItem('auth', 'autentificado_' + resp.id);
          localStorage.setItem('rol', resp.rol);
          this.router.navigate(['/listadoReuniones/' + resp.id]);
        } else {
          this.showErrorMessage = true;
        }
      });

    }
  }


}
