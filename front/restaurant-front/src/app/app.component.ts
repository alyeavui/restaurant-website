import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommentsComponent } from './components/comments/comments.component';
import { CommonModule } from '@angular/common';
import { LandingComponent } from "./pages/landing/landing.component";

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
]
})
export class AppComponent {
  title = 'restaurant-front';
}

