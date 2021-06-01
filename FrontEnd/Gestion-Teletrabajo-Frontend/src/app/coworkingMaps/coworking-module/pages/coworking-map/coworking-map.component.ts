import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  constructor(private router: Router, private route: ActivatedRoute, private coworkingService: CoworkingService) {
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
            const formGroup = new FormGroup({direccion: new FormControl(''), calle: new FormControl(''), abierto: new FormControl('')});
            formGroup.controls.direccion.setValue('');
            formGroup.controls.calle.setValue('');
            formGroup.controls.abierto.setValue(false);
            this.formArray.push(formGroup);
          });
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

    // tslint:disable-next-line:only-arrow-functions tslint:disable-next-line:typedef
    // tslint:disable-next-line:typedef
    this.mapa.on('click', this.marcadores, function(e) {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(this.mapa);
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
        const formGroup = new FormGroup({direccion: new FormControl(''), calle: new FormControl(''), abierto: new FormControl()});
        formGroup.controls.direccion.setValue('');
        formGroup.controls.calle.setValue('');
        formGroup.controls.abierto.setValue(false);
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

      const updateCoworking = this.coworkingService.updateCoworking(lng, lat, this.coworkings[index].idCoworking.toString());
      updateCoworking.subscribe((resp) => {
        if (resp) {
        }
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
