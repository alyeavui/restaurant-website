import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';



interface TokenResponse {
  access: string;
  refresh: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private accessKey = 'access_token';
  private refreshKey = 'refresh_token';

  public isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<TokenResponse> {
    return this.http
      .post<TokenResponse>(`${this.apiUrl}/token/`, { username, password })
      .pipe(
        tap(({ access, refresh }) => {
          localStorage.setItem(this.accessKey, access);
          localStorage.setItem(this.refreshKey, refresh);
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.accessKey);
    localStorage.removeItem(this.refreshKey);
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.accessKey);
  }
  getCurrentUserId(): number | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
  
      return decodedToken.user_id;  
    }
    return null;
  }
  private hasToken(): boolean {
    return !!localStorage.getItem(this.accessKey);
  }


 
  // private apiUrl = 'http://localhost:8000/api';
  // private tokenKey = 'auth_token';
  // private userIdKey = 'user_id';
  
  // private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  // public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  // constructor(private http: HttpClient) { }
  
  // login(username: string, password: string): Observable<any> {
  //   return this.http.post<{token: string, user_id: number}>(`${this.apiUrl}/token/`, { username, password })
  //     .pipe(
  //       tap(response => {
  //         localStorage.setItem(this.tokenKey, response.token);
  //         localStorage.setItem(this.userIdKey, response.user_id.toString());
  //         this.isAuthenticatedSubject.next(true);
  //       })
  //     );
  // }
  
  // logout(): void {
  //   localStorage.removeItem(this.tokenKey);
  //   localStorage.removeItem(this.userIdKey);
  //   this.isAuthenticatedSubject.next(false);
  // }
  
  // isAuthenticated(): boolean {
  //   return this.hasToken();
  // }
  
  // getCurrentUserId(): number | null {
  //   const userId = localStorage.getItem(this.userIdKey);
  //   return userId ? parseInt(userId, 10) : null;
  // }
  
  // getToken(): string | null {
  //   return localStorage.getItem(this.tokenKey);
  // }
  
  // private hasToken(): boolean {
  //   return !!localStorage.getItem(this.tokenKey);
  // }
}


