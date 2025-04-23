import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';
@Component({
  selector: 'app-restaurants',
  imports: [CommonModule, RouterModule, HeaderComponent, FormsModule],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.css'
})
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  searchTerm: string = '';
  constructor(private restaurantService: RestaurantService, private router: Router) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe((data) => {
      this.restaurants = data;
      console.log(data); 
      this.filteredRestaurants = data;
    });
  }

  goToRestaurantDetail(id: number): void {
    this.router.navigate(['/restaurant', id]);
  }

  
  searchRestaurants(): void {
    if (this.searchTerm.trim() !== '') {
      this.filteredRestaurants = this.restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else{
      this.filteredRestaurants = this.restaurants;  
    }
  }
}
