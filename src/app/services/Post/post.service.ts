import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Post } from '../../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  http=inject(HttpClient);

  getPosts()
  {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

  getPostsId(postId:number)
  {
    return this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  }

  deletePosts(_post:Post)
  {
     return this.http.delete(`https://jsonplaceholder.typicode.com/posts/${_post.id}`);
  }

  updatePosts(post:Post)
  {
     return this.http.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`,post);
  }

}
