import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { delay } from 'rxjs';
import { Feature, IPlacesResponse } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api/places-api-client';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private placesApi = inject(PlacesApiClient);
  public geoLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] =[];
  

  constructor() {
    this.getUserLocation();
   }

  get isUserLocationReady(): boolean{
    return !!this.geoLocation
  }

  public async getUserLocation(): Promise<[number, number]>{
    delay(1000);
    return new Promise( (resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.geoLocation = [coords.longitude, coords.latitude];
          resolve(this.geoLocation);
          
        },
        (error) => {
          alert('Geo locationg not obtained!');
          console.log(error);
          reject();
        }
      )
    });
  }
  public getPlacesByQuery(query: string = ''){
    //todo: evaluate null query
    if(!this.geoLocation) throw Error('No user location!');
    console.log(this.geoLocation)

    this.isLoadingPlaces = true

    this.placesApi.get<IPlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.geoLocation.join(',')
      }
    })
    .subscribe(resp => {
      console.log(resp.features)
      this.isLoadingPlaces=false;
      this.places = resp.features;
    });
  }
}
