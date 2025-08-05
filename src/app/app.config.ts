import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({
      projectId: "cashbook-979b7",
      appId: "1:575903547165:web:c7b809df944630a7716bf4",
      storageBucket: "cashbook-979b7.firebasestorage.app",
      apiKey: "AIzaSyAw6Nor69h7X2uHI1EfujHHwg-717KIOOA",
      authDomain: "cashbook-979b7.firebaseapp.com",
      messagingSenderId: "575903547165",
      measurementId: "G-E62D6DZXR3"
    })), provideFirestore(() => getFirestore())
  ]
};
