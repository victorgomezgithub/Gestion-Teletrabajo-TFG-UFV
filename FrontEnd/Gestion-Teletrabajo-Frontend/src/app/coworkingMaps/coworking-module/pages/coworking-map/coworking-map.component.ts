import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../../environments/environment';
import { CoworkingService } from '../../services/coworking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Coworking } from '../../interfaces/coworking';
import { FormGroup, FormControl, FormArray } from '@angular/forms';


interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
}

@Component({
  selector: 'app-coworking-map',
  templateUrl: './coworking-map.component.html',
  styleUrls: ['./coworking-map.component.css']
})
export class CoworkingMapComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel = 12;
  center: [number, number] = [-3.7027435849639327, 40.40651967652269];
  public opened = false;
  public subMenu = false;

  formArray = new FormArray([]);

  public id: string;

  coworkings: Coworking[] = [];

  // Arreglo de marcadores
  marcadores: MarcadorColor[] = [];

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private route: ActivatedRoute, private coworkingService: CoworkingService, private cd: ChangeDetectorRef) {
    this.id = this.route.snapshot.paramMap.get('id');

    if (localStorage.getItem('auth') !== ('autentificado_' + this.id)) {
      this.router.navigate(['/']);
    }
   }

  ngAfterViewInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const coworkings = this.coworkingService.cargarCoworkingEmpleado(this.id);

    if (coworkings) {
      coworkings.subscribe((resp) => {
        if (resp) {

          this.coworkings = [...resp];

          this.coworkings.forEach(element => {

            const color = element.color;

            const nuevoMarcador = new mapboxgl.Marker({
              draggable: true,
              color
            })
              .setLngLat([element.ejeX, element.ejeY])
              .addTo(this.mapa);


            nuevoMarcador.on('dragend', () => {
              this.guardarMarcadoresLocalStorage();
            });
            this.marcadores.push({
              color,
              marker: nuevoMarcador
            });
            // tslint:disable-next-line:max-line-length
            const formGroup = new FormGroup({direccion: new FormControl(''), descripcion: new FormControl(''), abierto: new FormControl('')});
            formGroup.controls.direccion.setValue(element.direccion);
            formGroup.controls.descripcion.setValue(element.descripcion);
            formGroup.controls.abierto.setValue(false);
            console.log('PASOOOOOOOOOO');
            this.formArray.push(formGroup);
          });

          this.cd.detectChanges();
        }

      });
    }


    mapboxgl.accessToken = environment.mapboxToken;

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });


  }


  agregarMarcador(): void {

    // tslint:disable-next-line:no-bitwise
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat(this.center)
      .addTo(this.mapa);

    this.marcadores.push({
      color,
      marker: nuevoMarcador
    });

    const coworkingNuevo = this.coworkingService.createCoworking(this.center[0].toString(), this.center[1].toString(), color, this.id);
    coworkingNuevo.subscribe((resp) => {
      if (resp) {
        this.coworkings.push(resp);
        const formGroup = new FormGroup({direccion: new FormControl(''), descripcion: new FormControl(''), abierto: new FormControl()});
        formGroup.controls.direccion.setValue(resp.direccion);
        formGroup.controls.descripcion.setValue(resp.descripcion);
        formGroup.controls.abierto.setValue(true);
        console.log('PASOOOOOOOOOO');

        this.formArray.push(formGroup);
      }
    });



    this.guardarMarcadoresLocalStorage();

    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLocalStorage();
    });

  }

  irMarcador(marker: any): void {
    this.mapa.flyTo({
      center: marker.getLngLat()
    });
  }


  guardarMarcadoresLocalStorage(): void {

    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach((m, index) => {

      const color = m.color;
      // tslint:disable-next-line:no-non-null-assertion
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color,
        centro: [lng, lat]
      });

      // tslint:disable-next-line:max-line-length
      const updateCoworking = this.coworkingService.updateCoworking(lng, lat, this.coworkings[index].idCoworking.toString(), (this.formArray.controls[index] as any).value.descripcion, (this.formArray.controls[index] as any).value.direccion);
      updateCoworking.subscribe((resp) => {
        if (resp) {
        }
      });

      this.formArray.controls.forEach((formGroup) => {
        console.log(formGroup.value.direccion);
          });
    });

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));

  }

  leerLocalStorage(): void {

    if (!localStorage.getItem('marcadores')) {
      return;
    }

    // tslint:disable-next-line:no-non-null-assertion
    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);

    lngLatArr.forEach(m => {

      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        // tslint:disable-next-line:no-non-null-assertion
        .setLngLat(m.centro!)
        .addTo(this.mapa);

      this.marcadores.push({
        marker: newMarker,
        color: m.color
      });

      newMarker.on('dragend', () => {
        this.guardarMarcadoresLocalStorage();
      });
    });

  }

  borrarMarcador(i: number): void {

    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i, 1);
    this.guardarMarcadoresLocalStorage();


    const deleteCoworking = this.coworkingService.deleteCoworking(this.coworkings[i].idCoworking);
    if (deleteCoworking) {
      deleteCoworking.subscribe((resp) => {
        if (resp) {
          this.coworkings.splice(i, 1);
        }
      });
    }
  }

  openNav(): void {
    document.getElementById('mySidebar').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
  }

  closeNav(): void {
    document.getElementById('mySidebar').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }

  toggleSidebar(): void {
    this.opened = !this.opened;
    this.subMenu = !this.subMenu;

  }

  submenu(i: number): void {
    this.subMenu = !this.subMenu;
    (this.formArray.controls[i] as any).controls.abierto.value = !(this.formArray.controls[i] as any).controls.abierto.value;

  }
}
