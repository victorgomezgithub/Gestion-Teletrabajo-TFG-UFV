import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../../environments/environment';
import { CoworkingService } from '../../services/coworking.service';
import { ActivatedRoute } from '@angular/router';
import { Coworking } from '../../interfaces/coworking';


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
  zoomLevel = 15;
  center: [number, number] = [-3.7027435849639327, 40.40651967652269];

  public id: string;

  coworkings: Coworking[] = [];

  // Arreglo de marcadores
  marcadores: MarcadorColor[] = [];

  constructor(private route: ActivatedRoute, private coworkingService: CoworkingService) { }

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
          });
        }

        console.log(this.marcadores);
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

    console.log(this.coworkings[i].idCoworking);

    const deleteCoworking = this.coworkingService.deleteCoworking(this.coworkings[i].idCoworking);
    if (deleteCoworking) {
      deleteCoworking.subscribe((resp) => {
        if (resp) {
          this.coworkings.splice(i, 1);
        }
      });
    }
  }
}
