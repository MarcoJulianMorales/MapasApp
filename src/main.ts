import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibW1vcmFsZXMyMDIzIiwiYSI6ImNsa3l4Zno2dDE4enYzZG8yZm0xNGY0eHkifQ._PGYhCqPQtjSyOchCMeBcg';

if(!navigator.geolocation) {
  alert('Browser does not support GeoLocation');
  throw new Error('Browser does not support GeoLocation');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

