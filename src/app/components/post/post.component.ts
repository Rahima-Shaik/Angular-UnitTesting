import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Post } from '../../models/Post';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

  @Input() childData!: Post;
  @Output() delete = new EventEmitter<Post>();
 
  onDeletePost(event:Event)
  {
      event.stopPropagation();
      this.delete.emit(this.childData);
  }
}
