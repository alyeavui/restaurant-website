import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-main',
  imports: [RouterModule],
  templateUrl: './header-main.component.html',
  styleUrl: './header-main.component.css'
})
export class HeaderMainComponent {
  constructor(private router: Router) {}

  login(): void {
    this.router.navigate(['/login']);
  }
}
