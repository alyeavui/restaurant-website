import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommentsModule } from '../comments/comments/comments.module';

@Component({
  selector: 'app-header',
  imports: [CommentsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {}
  goToMenu() {
    this.router.navigate(['/menu']);
  }
}
