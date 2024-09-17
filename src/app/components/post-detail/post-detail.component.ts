import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/Post/post.service';
import { Post } from '../../models/Post';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent {
  post!:Post
  constructor(private route:ActivatedRoute,private service:PostService,private location:Location){}

  ngOnInit(){
    this.getPost();
  }

  getPost(){
    const id=this.route.snapshot.paramMap.get('id');
    id && this.service.getPostsId(+id).subscribe((res:any)=>{
    this.post=res;
    });
  }

  goBack(){
    this.location.back();
  }

  save()
  {
    this.service.updatePosts(this.post).subscribe(()=>{
      this.goBack();
    })
  }
}
