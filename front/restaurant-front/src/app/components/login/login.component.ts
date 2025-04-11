// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
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
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  isLoading = false;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    const { username, password } = this.loginForm.value;
    
    this.authService.login(username, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login error:', error);
        if (error.status === 400) {
          this.errorMessage = 'Invalid username or password';
        } else {
          this.errorMessage = 'An error occurred during login. Please try again.';
        }
      }
    });
  }

  goToHome(): void {
      this.router.navigate(['/home']);
  }
}