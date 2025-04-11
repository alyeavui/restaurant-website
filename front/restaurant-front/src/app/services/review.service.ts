import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getReviews(restaurantId: number): Observable<{reviews: Review[]}> {
    return this.http.get<{reviews: Review[]}>(`${this.apiUrl}/restaurants/${restaurantId}/reviews/`);
  }

  getReview(restaurantId: number, reviewId: number): Observable<{review: Review}> {
    return this.http.get<{review: Review}>(`${this.apiUrl}/restaurants/${restaurantId}/reviews/${reviewId}`);
  }

  addReview(restaurantId: number, review: Omit<Review, 'id' | 'user' | 'restaurant' | 'created_at' | 'updated_at'>): Observable<{new_review: Review}> {
    return this.http.post<{new_review: Review}>(`${this.apiUrl}/restaurants/${restaurantId}/reviews/`, review);
  }

  updateReview(restaurantId: number, reviewId: number, review: Partial<Review>): Observable<{review: Review}> {
    return this.http.put<{review: Review}>(`${this.apiUrl}/restaurants/${restaurantId}/reviews/${reviewId}`, review);
  }

  deleteReview(restaurantId: number, reviewId: number): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.apiUrl}/restaurants/${restaurantId}/reviews/${reviewId}`);
  }
}