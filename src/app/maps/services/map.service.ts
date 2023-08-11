import { Injectable } from '@angular/core';
import { LngLatLike, Map } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: Map | undefined;

  get isMapReady(): boolean{
    return !!this.map;
  }

  setMap(map: Map): void{
    this.map = map;
  }

  flyTo( coords: LngLatLike): void{
    if(!this.isMapReady) throw new Error('Map is not initialized!');

    this.map?.flyTo({
      zoom:14,
      center:coords
    })
  }

  constructor() { }
}
