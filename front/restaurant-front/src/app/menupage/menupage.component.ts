import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../services/restaurant.service';
import { Menu } from '../menu';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-menupage',
  standalone: true,
  imports: [CommonModule, RouterModule, SlickCarouselModule, HeaderComponent],
  templateUrl: './menupage.component.html',
  styleUrls: ['./menupage.component.css'] 
})
export class MenupageComponent implements OnInit {
  menus: Menu[] = [];
  restaurantId!: number;

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    infinite: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.restaurantId = Number(this.route.snapshot.paramMap.get('id'));
    this.restaurantService.getMenus(this.restaurantId).subscribe((data) => {
      this.menus = data;
    });
  }

  goToDishes(menuId: number): void {
    this.router.navigate(['/restaurant', this.restaurantId, 'menu', menuId, 'dishes']);
  }
}