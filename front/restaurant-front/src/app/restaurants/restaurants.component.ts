import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HeaderMainComponent } from '../components/header-main/header-main.component';
@Component({
  selector: 'app-restaurants',
  imports: [CommonModule, RouterModule, HeaderMainComponent],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.css'
})
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService, private router: Router) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe((data) => {
      this.restaurants = data;
      console.log(data); 
    });
  }

  goToRestaurantDetail(id: number): void {
    this.router.navigate(['/restaurant', id]);
  }
}
