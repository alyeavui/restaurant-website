import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideHttpClient(),  provideHttpClient(),

    
   
    FormsModule,  // Register FormsModule here
  ]
};;

// import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { RestaurantsComponent } from './restaurants/restaurants.component';
// import { routes } from './app.routes';
// import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { AuthInterceptor } from './interceptors/auth.interceptor';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes),
//     provideHttpClient(), 

//     { provide: HTTP_INTERCEPTORS, useValue: authInterceptor, multi: true }, // Register your function-based interceptor

//     FormsModule,
//   ],
// };
