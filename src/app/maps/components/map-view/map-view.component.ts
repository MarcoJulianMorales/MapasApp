import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Map, Marker, Popup } from 'mapbox-gl';

@Component({
  selector: 'map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('map') mapDivElement!: ElementRef

  private placesService = inject(PlacesService);
  private mapsService = inject(MapService);
  public geoLocation?: [number, number];

  ngAfterViewInit(): void {
    this.geoLocation = this.placesService.geoLocation;

    if (!this.geoLocation) throw new Error('no geoLocation obtained!')

    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.geoLocation, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });

    const popup = new Popup()
      .setHTML(`
        <h1>My Location</h1>
        <span>I'm here</span>
      `)
    
    new Marker({color:'red'})
    .setLngLat(this.geoLocation)
    .setPopup(popup)
    .addTo(map);

    this.mapsService.setMap(map);
  }


}
