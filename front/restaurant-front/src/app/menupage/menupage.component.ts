import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../restaurant';
import { Menu } from '../menu';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Dish } from '../dish';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menupage',
  imports: [CommonModule, RouterModule],
  templateUrl: './menupage.component.html',
  styleUrl: './menupage.component.css'
})
export class MenupageComponent implements OnInit {
  menus: Menu[] = [];
  restaurantId!: number;

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantService, private router: Router) {}

  ngOnInit(): void {
    this.restaurantId = Number(this.route.snapshot.paramMap.get('id'));
    this.restaurantService.getMenus(this.restaurantId).subscribe(data => {
      this.menus = data;
    });
  }

  goToDishes(menuId: number): void {
    this.router.navigate(['/restaurant', this.restaurantId, 'menu', menuId, 'dishes']);
  }
}

