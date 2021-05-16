import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../../environments/environment';


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
  center: [number, number] = [ -75.921029433568, 45.28719674822362 ];

  // Arreglo de marcadores
  marcadores: MarcadorColor[] = [];

  constructor() { }

  ngAfterViewInit(): void {

    mapboxgl.accessToken = environment.mapboxToken;

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.leerLocalStorage();

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola Mundo';

    // new mapboxgl.Marker()
    //   .setLngLat( this.center )
    //   .addTo( this.mapa );

  }


  agregarMarcador(): void {

    // tslint:disable-next-line:no-bitwise
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat( this.center )
      .addTo( this.mapa );

    this.marcadores.push({
      color,
      marker: nuevoMarcador
    });

    this.guardarMarcadoresLocalStorage();

    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLocalStorage();
    });

  }

  irMarcador( marker: any ): void {
    this.mapa.flyTo({
      center: marker.getLngLat()
    });
  }


  guardarMarcadoresLocalStorage(): void {

    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach( m => {

      const color = m.color;
      // tslint:disable-next-line:no-non-null-assertion
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color,
        centro: [ lng, lat ]
      });
    });

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr) );

  }

  leerLocalStorage(): void {

    if ( !localStorage.getItem('marcadores') ) {
      return;
    }

    // tslint:disable-next-line:no-non-null-assertion
    const lngLatArr: MarcadorColor[] = JSON.parse( localStorage.getItem('marcadores')! );

    lngLatArr.forEach( m => {

      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        // tslint:disable-next-line:no-non-null-assertion
        .setLngLat( m.centro! )
        .addTo( this.mapa );

      this.marcadores.push({
        marker: newMarker,
        color: m.color
      });

      newMarker.on('dragend', () => {
        this.guardarMarcadoresLocalStorage();
      });


    });

  }

  borrarMarcador( i: number ): void {

    this.marcadores[i].marker?.remove();
    this.marcadores.splice( i, 1);
    this.guardarMarcadoresLocalStorage();
  }
}
