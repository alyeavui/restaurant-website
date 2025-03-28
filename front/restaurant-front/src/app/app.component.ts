import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RestaurantsComponent } from './restaurants/restaurants.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RestaurantsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'restaurant-front';
}
