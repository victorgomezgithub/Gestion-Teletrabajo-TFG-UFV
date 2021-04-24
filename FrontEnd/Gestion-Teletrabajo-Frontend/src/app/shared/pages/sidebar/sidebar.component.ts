import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public id: string;

  private listadoReuniones = '/listadoReuniones/';
  private pricing = '/pricing/';
  private busquedaUsuarios = '/busquedaUsuarios/';
  private estadisticas = '/estadisticas/';
  private panelConfiguracion = '/panelConfiguracion/';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  toCalendario(): void {
    this.router.navigate([this.listadoReuniones + this.id]);
  }

  toPricing(): void {
    this.router.navigate([this.pricing + this.id]);
  }

  toBusquedaUsuarios(): void {
    this.router.navigate([this.busquedaUsuarios + this.id]);
  }

  toEstadisticas(): void {
    this.router.navigate([this.estadisticas + this.id]);
  }

  toPanelConfiguracion(): void {
    this.router.navigate([this.panelConfiguracion + this.id]);
  }
}
