import { Component, inject, OnInit } from '@angular/core';
import { Post } from '../../models/Post';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../../services/Post/post.service';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule,PostComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit{
  
  postData:Post[]=[]; 
  
  constructor(private postsService : PostService){
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts()
  {
    this.postsService.getPosts().subscribe((res:any)=>{
      this.postData=res;
    });
  }

  deletePosts(post:Post)
  {
    this.postsService.deletePosts(post).subscribe((res:any)=>{
      console.log('Delete response:',res);
      // Update the local postData after successful deletion
      this.postData = this.postData.filter((p) => p.id !== post.id);
      console.log('Updated postData:', this.postData);
    });
  }
}
