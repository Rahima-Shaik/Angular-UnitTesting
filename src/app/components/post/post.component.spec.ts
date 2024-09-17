import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { Post } from '../../models/Post';
import { first } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';


describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let router: Router;

  beforeEach(() => {

    TestBed.configureTestingModule({
      //we need to test the component along with its template
      imports: [
        PostComponent,
        RouterTestingModule.withRoutes([]),  // Import RouterTestingModule to handle routerLink
      ],
    });
    router = TestBed.inject(Router);  // Inject Router if needed for testing
    //TestBed.createComponent will create the component for us and will add component template into the DOM and it will return u the fixture.	
    fixture = TestBed.createComponent(PostComponent);
    //if we want to get the instance of the component, in this fixture you will have the DOM elements along with its component instance
    component = fixture.componentInstance;

  });

  it('should accept @Input as the childData', () => {
    //component = new PostComponent();  --> As we are creating the TestBed for the component, it is not reuired
    const mockpost: Post = { id: 1, body: 'body 1', title: 'title 1' };
    component.childData = mockpost;
    expect(component.childData).toEqual(mockpost);
  });

  it('should raise an event when the delete post is clicked', () => {
    // component = new PostComponent();  --> As we are creating the TestBed for the component, it is not reuired
    // Define a single mock post object (not an array)
    const post: Post = { id: 1, body: 'body 1', title: 'title 1' };

    // Set the @Input() childData property to a single post object
    component.childData = post;

    // Subscribe to the 'delete' event and expect it to emit 'post'
    component.delete.pipe(first()).subscribe((selected: any) => {
      expect(selected).toEqual(post);
    });
    component.onDeletePost(new MouseEvent('click'));

  });

  it('should create the post component using TestBed', () => {
    expect(component).toBeTruthy();
  });

  it('should display the post title if there are anchor element', () => {
    const mockpost: Post = { id: 1, body: 'body 1', title: 'title 1' };
    component.childData = mockpost;
    fixture.detectChanges();  //updates the DOM

    // Query the anchor tag using DebugElement
    const anchorDebugElement = fixture.debugElement.query(By.css('a'));
    const anchorElement: HTMLElement = anchorDebugElement.nativeElement;

    // Check if the routerLink attribute is correctly set
    const routerLinkValue = anchorElement.getAttribute('href');
    expect(routerLinkValue).toBe('/details/1');

    // Check if the correct title is rendered in the anchor tag
    expect(anchorElement.textContent).toContain(mockpost.title);
  });
});
