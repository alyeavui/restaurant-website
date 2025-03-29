import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../restaurant';
import { Menu } from '../menu';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Dish } from '../dish';
@Component({
  selector: 'app-dishespage',
  imports: [CommonModule, RouterModule],
  templateUrl: './dishespage.component.html',
  styleUrl: './dishespage.component.css'
})
export class DishespageComponent implements OnInit {
  dishes: Dish[] = [];
  restaurantId!: number;
  menuId!: number;

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.restaurantId = Number(this.route.snapshot.paramMap.get('id'));
    this.menuId = Number(this.route.snapshot.paramMap.get('menuId'));

    this.restaurantService.getDishes(this.restaurantId, this.menuId).subscribe(data => {
      this.dishes = data;
    });
  }
}

