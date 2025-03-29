import { Component, OnInit} from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../restaurant';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-restaurant-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './restaurant-detail.component.html',
  styleUrl: './restaurant-detail.component.css'
})
export class RestaurantDetailComponent  implements OnInit{
  restaurant!: Restaurant;

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantService, private router:Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.restaurantService.getRestaurantById(id).subscribe(data => {
      this.restaurant = data;
    });
  }

  goToMenu(): void {
    if (this.restaurant) {
      this.router.navigate(['/restaurant', this.restaurant.id, 'menu']);
    }
  }
}