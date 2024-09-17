import { Post } from '../../models/Post';
import { PostService } from '../../services/Post/post.service';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsComponent } from './posts.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PostComponent } from '../post/post.component';

// class mockpostService {
//   getPosts() {

//   }
//   deletePosts(post:Post){
//     return of(true);
//   }
// }

describe('PostsComponent', () => {
  let post: Post[];
  let component: PostsComponent;
  let mockpostService: PostService;
  let fixture: ComponentFixture<PostsComponent>;


  mockpostService = jasmine.createSpyObj('PostService', ['getPosts', 'deletePosts']);

  //Creating FakeComp for child component
  // @Component({
  //   selector:'app-post',
  //   template:'<div></div>'
  // })
  // class FakePostComponent{
  //   @Input() post:Post | undefined;
  // }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        PostsComponent,
        PostComponent,
        RouterTestingModule
      ],
      // declarations:[FakePostComponent],
      providers: [
        {
          provide: PostService, useValue: mockpostService,
        },
      ],
    });
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;

    //mockpostService = TestBed.inject(PostService);

    post = [
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
  });

  // For Every method, we need to create a Test Suit as below
  describe('delete method', () => {
    beforeEach(() => {
      // Mock the deletePosts method to return an Observable of the mock response
      (mockpostService.deletePosts as jasmine.Spy).and.returnValue(of(true));
      component.postData = post;
    });
    it('it should delete the selected post from the posts', () => {
      component.deletePosts(post[1]);
      expect(component.postData.length).toBe(2);
    });

    it('Should delete the selected Post in posts', () => {
      component.deletePosts(post[2]);
      for (let postp of component.postData) {
        expect(postp).not.toEqual(post[2]);
      }
    });

    it('it should call the delete method in the Post service once', () => {
      //spyOn(mockpostService,'deletePosts').and.returnValue(of(true));
      component.deletePosts(post[1]);
      expect(mockpostService.deletePosts).toHaveBeenCalled();
    });

    it('it should call the delete method when we click on (delete method) in post component', () => {
      spyOn(component, 'deletePosts');
      (mockpostService.deletePosts as jasmine.Spy).and.returnValue(of(post));
      component.postData = post;
      fixture.detectChanges();

      let postComponentDEs = fixture.debugElement.queryAll(By.directive(PostComponent));

      for (let i = 0; i < postComponentDEs.length; i++) {
        fixture.detectChanges();
        postComponentDEs[i].query(By.css('button')).triggerEventHandler('click', { stopPropagation: () => { } });
        expect(component.deletePosts).toHaveBeenCalledWith(post[i]);
      }
    });

    it('it should call the delete method when the delete event is emitted by post component', () => {
      spyOn(component, 'deletePosts').and.returnValues();
      (mockpostService.deletePosts as jasmine.Spy).and.returnValue(of(post));
      fixture.detectChanges();

      let postComponentDEs = fixture.debugElement.queryAll(By.directive(PostComponent));

      for (let i = 0; i < postComponentDEs.length; i++) {
        fixture.detectChanges();
        (postComponentDEs[i].componentInstance as PostComponent).delete.emit(post[i]);
        expect(component.deletePosts).toHaveBeenCalledWith(post[i]);
      }
    });
  });

  describe('get post', () => {
    it('should set the posts directly from the service', () => {
      (mockpostService.getPosts as jasmine.Spy).and.returnValue(of(post));
      fixture.detectChanges();
      expect(component.postData.length).toBe(3);
    });

    it('should create the child element for each Post', () => {
      (mockpostService.getPosts as jasmine.Spy).and.returnValue(of(post));
      fixture.detectChanges();
      const debugEle = fixture.debugElement.queryAll(By.css('.post'));
      expect(debugEle.length).toBe(post.length);
    });

    it('should create the exact num is sending to postComponent', () => {
      (mockpostService.getPosts as jasmine.Spy).and.returnValue(of(post));
      fixture.detectChanges();

      const debugEle = fixture.debugElement.queryAll(By.directive(PostComponent));
      for (let i = 0; i < debugEle.length; i++) {
        let postInstance = debugEle[i].componentInstance as PostComponent;
        expect(postInstance.childData.title).toEqual(post[i].title);
      }
    });
  });
});
