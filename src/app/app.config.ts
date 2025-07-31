import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { EventEffects } from './store/event/event.effects';
import { SpService } from './store/service/service.effects';
import { serviceReducer } from './store/service/service.reducer';
import { rentReducer } from './store/rent/rent.reducer';
import { eventReducer } from './store/event/event.reducer';
import { EventServiceService } from './services/event/event-service.service';
import { RentEffect } from './store/rent/rent.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      service: serviceReducer,
      rent: rentReducer,
      event: eventReducer,
    }),
    provideEffects([RentEffect,EventEffects,SpService]),
    provideHttpClient(),
    provideAnimationsAsync(),
     EventServiceService ,
  ],
};
