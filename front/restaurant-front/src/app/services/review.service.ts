import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Review {
  id: number;
  restaurant: number;
  user: number;
  text: string;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  
  private apiUrl = 'http://localhost:8000/api/restaurants';
  constructor(private http: HttpClient) {}

  getReviews(restaurantId: number): Observable<any> {
    const url = `${this.apiUrl}/${restaurantId}/reviews/`;
    return this.http.get(url); 
  }
  
  
 
  addReview(restaurantId: number, reviewData: any): Observable<any> {
    const url = `${this.apiUrl}/${restaurantId}/reviews/`;
    return this.http.post(url, reviewData, this.getHttpOptions());
  }

  updateReview(restaurantId: number, reviewId: number, reviewData: any): Observable<any> {
    const url = `${this.apiUrl}/${restaurantId}/reviews/${reviewId}/`;
    return this.http.put(url, reviewData, this.getHttpOptions());
  }

  deleteReview(restaurantId: number, reviewId: number): Observable<any> {
    const url = `${this.apiUrl}/${restaurantId}/reviews/${reviewId}/`;
    return this.http.delete(url, this.getHttpOptions());
  }

  private getHttpOptions() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', 
    });

    return { headers };
  }
}