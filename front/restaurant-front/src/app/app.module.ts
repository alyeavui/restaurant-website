import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ReviewService } from './services/review.service';
import { authInterceptor } from './interceptors/auth.interceptor';

// Bootstrap the application with the AppComponent as the root component
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    ReviewService
  ]
}).catch(err => console.error(err));