import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header-main',
  imports: [RouterModule, CommonModule],
  templateUrl: './header-main.component.html',
  styleUrl: './header-main.component.css'
})
export class HeaderMainComponent {
    isAuthenticated = false;
  
    constructor(private router: Router, private authService: AuthService) {}
  
    ngOnInit(): void {
      this.authService.isAuthenticated$.subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      });
    }
  
    login(): void {
      this.router.navigate(['/login']);
    }
  
    logout(): void {
      this.authService.logout();
      this.router.navigate(['/home']); 
    }
}
