import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'http://127.0.0.1:8000/api/restaurants/';

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.apiUrl);
  }
}
