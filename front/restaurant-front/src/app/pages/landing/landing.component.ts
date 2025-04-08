import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { HeroSectionComponent } from "../../components/hero-section/hero-section.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CommentsComponent } from '../../components/comments/comments.component';

@Component({
  selector: 'app-landing',
  imports: [HeaderComponent, HeroSectionComponent, FooterComponent, CommentsComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
