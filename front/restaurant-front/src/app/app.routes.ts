import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenupageComponent } from './menupage/menupage.component';
import { DishespageComponent } from './dishespage/dishespage.component';
export const routes: Routes = [
  { path: '', component: RestaurantsComponent },
  { path: 'restaurant/:id', component: RestaurantDetailComponent },
  { path: 'restaurant/:id/menu', component: MenupageComponent },
  { path: 'restaurant/:id/menu/:menuId/dishes', component: DishespageComponent} 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

