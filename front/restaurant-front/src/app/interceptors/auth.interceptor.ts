// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('access_token');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` // For Django's Token authentication
        // For JWT, use: Authorization: `Bearer ${token}`
      }
    });
  }
  
  return next(req);
}; //////////// NOT WORKING I DONT KNOW WHy



