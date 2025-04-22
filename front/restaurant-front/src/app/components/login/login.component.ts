// src/app/components/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: `./login.component.html`,
  styleUrls: [`./login.component.css`]
})
export class LoginComponent  implements OnInit { 
  loginForm!: FormGroup;    // <-- declare without initializing here
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    // initialize the form once fb is available
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // nothing needed here for the form
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';
    const { username, password } = this.loginForm.value;

    this.auth.login(username, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: err => {
        this.isLoading = false;
        this.errorMessage =
          err.status === 401 ? 'Invalid credentials' : 'Server error—try again.';
      }
    });
  }
  // loginForm: FormGroup;
  // errorMessage = '';
  // isLoading = false;
  // isAuthenticated = false;

  // constructor(
  //   private fb: FormBuilder,
  //   private authService: AuthService,
  //   private router: Router
  // ) {
  //   this.loginForm = this.fb.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });
  // }

  // ngOnInit(): void {
  //   // Check if the user is already authenticated when the component is initialized
  //   this.authService.isAuthenticated$.subscribe(isAuth => {
  //     this.isAuthenticated = isAuth;
  //   });
  // }

  // onSubmit(): void {
  //   if (this.loginForm.invalid) {
  //     return;
  //   }
    
  //   this.isLoading = true;
  //   this.errorMessage = '';
    
  //   const { username, password } = this.loginForm.value;
    
  //   this.authService.login(username, password).subscribe({
  //     next: () => {
  //       this.isLoading = false;
  //       this.isAuthenticated = true; 
  //       this.router.navigate(['/']);
  //     },
  //     error: (error) => {
  //       this.isLoading = false;
  //       console.error('Login error:', error);
  //       if (error.status === 400) {
  //         this.errorMessage = 'Invalid username or password';
  //       } else {
  //         this.errorMessage = 'An error occurred during login. Please try again.';
  //       }
  //     }
  //   });
  // }

  // onLogout(): void {
  //   this.authService.logout();
  //   this.isAuthenticated = false;
  // }

  // goToHome(): void {
  //   this.router.navigate(['/home']);
  // }
 
}