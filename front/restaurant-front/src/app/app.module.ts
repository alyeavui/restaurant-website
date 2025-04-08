import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Assuming your routes are exported from here
import { CommentsService } from './services/comments.service';

// Bootstrap the application with the AppComponent as the root component
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
  ]
}).catch(err => console.error(err));