import { Component, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
  imports: [CommonModule],
  providers: [CommentsService] 
})
export class CommentsComponent implements OnInit {
  @Input() currentUserId!: string;

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.commentsService.getComments().subscribe(comments => {
      console.log('comments', comments);
    })
  }
}
