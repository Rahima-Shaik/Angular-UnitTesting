import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailComponent } from './post-detail.component';
import { PostService } from '../../services/Post/post.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Post } from '../../models/Post';
import { By } from '@angular/platform-browser';


describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let mockpostService : jasmine.SpyObj<PostService>;
  let mocklocation : jasmine.SpyObj<Location>;
  
  beforeEach(() => {
    let mockroute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '1';
          },
        },
      },
    }

    mocklocation = jasmine.createSpyObj(['back']);
    mockpostService = jasmine.createSpyObj(['getPostsId', 'updatePosts']);
    
    TestBed.configureTestingModule({
      imports: [PostDetailComponent],
      providers: [
        {
          provide: PostService, useValue: mockpostService
        },
        {
          provide: Location, useValue: mocklocation
        },
        {
          provide: ActivatedRoute, useValue: mockroute
        }
      ]
    });

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the post title in h2 tag', () => {
   (mockpostService.getPostsId as jasmine.Spy).and.returnValue(of({
      id : 1,
      title :'title1',
      body :'body1'
   })
  );
   fixture.detectChanges();
   const elem = fixture.debugElement.query(By.css('h2')).nativeElement as HTMLElement;
   expect(elem.textContent).toBe(component.post.title);
  });
});

