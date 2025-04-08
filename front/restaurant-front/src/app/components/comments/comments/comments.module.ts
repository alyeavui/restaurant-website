import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from '../comments.component';
import { CommentsService } from '../../../services/comments.service';



@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule
  ],
  providers: [CommentsService]
})
export class CommentsModule { }
