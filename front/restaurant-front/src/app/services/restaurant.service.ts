import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../restaurant';
import { Menu } from '../menu';
import { Dish } from '../dish';
@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://127.0.0.1:8000/api/restaurants/';

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.apiUrl);
  }

  getRestaurantById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.apiUrl}${id}/`);
  }

  getMenus(restaurantId: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiUrl}${restaurantId}/menus/`);
  }

  getDishes(restaurantId: number, menuId: number): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${this.apiUrl}${restaurantId}/menus/${menuId}/dishes/`);

  }
}
