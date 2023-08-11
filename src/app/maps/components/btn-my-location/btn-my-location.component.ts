import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent {
  private mapService = inject(MapService);
  private placeService = inject(PlacesService);

  goToMyLocation(){
    if(!this.placeService.isUserLocationReady)  new Error('There is not user location');
    
    if(!this.mapService.isMapReady)  new Error('There is not available map');

    this.mapService.flyTo(this.placeService.geoLocation!);
  }
}
