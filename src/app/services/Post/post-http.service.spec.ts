import { TestBed } from "@angular/core/testing";
import { PostService } from "./post.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('(Http Client Testing Module) to Post Service', () => {
    let service: PostService;
    let httpClientController: HttpTestingController;
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
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PostService]
        });
        httpClientController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(PostService);
    });

    afterEach(()=>{
        httpClientController.verify();
    });

    describe('getPost()', () => {
        it('Should return the post when getPosts is called', () => {
            service.getPosts().subscribe((data) => {
              expect(data).toEqual(Post);
            });
            const req = httpClientController.expectOne('https://jsonplaceholder.typicode.com/posts');
            req.flush(Post);
            //expect(req.request.method).toBe('GET');
        });
        it('Should return the single post when the getPostsId is called',()=>{
           service.getPostsId(Post[0].id).subscribe((data)=>{
            expect(data).toEqual(Post);
           });
        //    service.getPostsId(Post[1].id).subscribe((data)=>{
        //     expect(data).toEqual(Post);
        //    });
           const req = httpClientController.expectOne('https://jsonplaceholder.typicode.com/posts/1');
           req.flush(Post);
           //it will verify that the only allowed req is made , no other req should be made
           //httpClientController.verify();
        });
    });
});