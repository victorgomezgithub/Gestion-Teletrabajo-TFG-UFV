import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from '../../services/empresas.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public id: string;
  public rol: string;
  public nombreEmpresa: string;
  constructor(private route: ActivatedRoute, private router: Router, private cargarEmpresa: EmpresaService, private cd: ChangeDetectorRef) {
    this.rol = localStorage.getItem('rol');
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    const empresaEmpleado = this.cargarEmpresa.cargarEmpresa(this.id);
    empresaEmpleado.subscribe((resp) => {
      if (resp) {
        this.nombreEmpresa = resp.nombreEmpresa;
      }
    });

    this.cd.detectChanges();

  }


  logOut(): any {
    localStorage.setItem('auth', '');
    localStorage.setItem('rol', '');
    this.router.navigate(['/']);
  }
}
