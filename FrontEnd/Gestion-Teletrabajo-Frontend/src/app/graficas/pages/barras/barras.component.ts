import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Color, Label, MultiDataSet } from 'ng2-charts';
import { BarrasService } from '../../services/barras.service';
import { Data } from '../../interfaces/data.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-barras',
  templateUrl: './barras.component.html',
  styleUrls: ['./barras.component.css']

})
export class BarrasComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;

  public arrayData: Data[] = [];
  public id: string;
  public barChartData: ChartDataSets[] = [
    { data: [ ], label: 'Reuniones Por Mes', backgroundColor: '#ED5F76', hoverBackgroundColor: 'red' }
  ];



  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  public circleChartOptions: ChartOptions = {
    responsive: true,
  };
  public circleChartLabels: Label[] = ['0 Empleados', '1 Empleados', '2 Empleados', '3 Empleados', '4 Empleados', '5 Empleados'];
  public circleChartType: ChartType = 'bar';
  public circleChartLegend = true;

  public circleArrayData: any[] = [];
  public circleChartData: any[] = [
    { data: [ ], label: 'Media empleados por Reuniones', backgroundColor: '#097CFF', hoverBackgroundColor: '#004593' }
  ];



  public doughnutChartLabels: Label[] = ['Obligatorio', 'Avisos'];
  public doughnutChartData: MultiDataSet =  [[]];
  public doughnutChartType: ChartType = 'doughnut';
  public arraydonutData: any[] = [];
  public doughnutChartOptions: ChartOptions = {

    title: {
      text: 'Proporción Panel de Configuración',
      display: true
    }
  };

  public colorCircles: Color[] = [{ backgroundColor: ['#ffff85', '#ff837a'] }];

  constructor(private route: ActivatedRoute, private router: Router, private barrasService: BarrasService, private cd: ChangeDetectorRef) {
    this.id = this.route.snapshot.paramMap.get('id');

    if (localStorage.getItem('auth') !== ('autentificado_' + this.id) && localStorage.getItem('rol') !== 'administrador') {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    const barrasReuMesAno = this.barrasService.getReunionesTot();
    if (barrasReuMesAno){
      barrasReuMesAno.subscribe((resp) => {
        if (resp) {
          this.arrayData = [...resp];
          this.barChartData[0].data.push(0);
          this.arrayData.forEach(element => {
            this.barChartData[0].data.push(+element.total);
          });
          this.barChartData[0].data.push(0);
          this.cd.detectChanges();
        }

      });
    }

    const pieEmpleadosPorReu = this.barrasService.getEmpleadosPorReu();
    if (pieEmpleadosPorReu){
      pieEmpleadosPorReu.subscribe((resp) => {
        if (resp) {
          this.circleArrayData = [...resp];
          this.circleChartData[0].data[0] = 0;
          this.circleChartData[0].data[1] = 0;
          this.circleChartData[0].data[2] = 0;
          this.circleChartData[0].data[3] = 0;
          this.circleChartData[0].data[4] = 0;
          this.circleChartData[0].data[5] = 0;

          this.circleArrayData.forEach(element => {
            console.log(element.integrantes);
            this.circleChartData[0].data[element.integrantes] = this.circleChartData[0].data[element.integrantes] + 1;
          });
          console.log(this.circleChartData);
          this.cd.detectChanges();
          this.chart.chart.update();
        }
      });
    }

    const confTipos = this.barrasService.getConfTipos();
    if (confTipos){
      confTipos.subscribe((resp) => {
        if (resp) {
          this.arraydonutData = [...resp];
          this.arraydonutData.forEach((element, index) => {
            this.doughnutChartData[0][index] = +element.numero;
            this.doughnutChartLabels[index] = element.tipo;
          });
        }
      });
      this.cd.detectChanges();
    }

  }


}
