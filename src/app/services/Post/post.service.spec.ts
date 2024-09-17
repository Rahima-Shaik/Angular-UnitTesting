import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('PostService', () => {
  let service: PostService;
  let httpClientSpy : jasmine.SpyObj<HttpClient>;
  let Post = [
    {
      id: 1,
      body: 'body 1',
      title: 'title 1'
    },
    {
      id: 2,
      body: 'body 2', 
      title: 'title 2'
    },
    {
      id: 3,
      body: 'body 3',
      title: 'title 3'
    }
  ];

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient',['get']);
    TestBed.configureTestingModule({
     providers:[
       PostService,{
        provide:HttpClient, useValue : httpClientSpyObj,
       }
     ]
    });
    service = TestBed.inject(PostService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>
  });

  describe('getPost()',()=>{
   it('Should return the post when getPosts is called',()=>{
     httpClientSpy.get.and.returnValue(of(Post));
     service.getPosts().subscribe({
        next:(posts)=>{
        expect(posts).toEqual(Post);
        },
        error : ()=>{}
     });
     expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
   });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
   
});
