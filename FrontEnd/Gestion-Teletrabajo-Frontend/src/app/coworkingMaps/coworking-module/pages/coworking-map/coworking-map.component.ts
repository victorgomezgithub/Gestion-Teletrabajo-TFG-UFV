import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';



declare var H: any;
@Component({
  selector: 'app-coworking-map',
  templateUrl: './coworking-map.component.html',
  styleUrls: ['./coworking-map.component.css']
})
export class CoworkingMapComponent implements AfterViewInit{
  title = 'here-project';
  private platform: any;


@ViewChild('map')
  public mapElement: ElementRef;

  public constructor() {
      this.platform = new H.service.Platform({
          apikey: 'a1YLIN_J6cO8NQ63nDngoPeiTqUSeo-VJA7Hu1e2NoU'
      });
  }

  public ngAfterViewInit(): any {
      const defaultLayers = this.platform.createDefaultLayers();
      const map = new H.Map(
          this.mapElement.nativeElement,
          defaultLayers.vector.normal.map,
          {
              zoom: 10,
              center: { lat: 37.7397, lng: -121.4252 }
          }
      );
  }
}
