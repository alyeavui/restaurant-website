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
  loginForm!: FormGroup;   
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
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

  goToHome(): void {
    this.router.navigate(['/home']);
  }
 
}