import { Component } from '@angular/core';
import { CommentsModule } from '../../components/comments/comments/comments.module';

@Component({
  selector: 'app-menu',
  imports: [CommentsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
