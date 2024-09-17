import { HttpClient, HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

let testUrl ='/data';
let httpClient: HttpClient;
let httpTestingController : HttpTestingController;
interface Data {
    name:string;
}

describe('Http Client Testing Module', () => { 
    beforeEach(() => {
        TestBed.configureTestingModule({
          imports:[HttpClientTestingModule]
        });
        //httpClient is a simulation call it actually doesn't make the call but it pretends to make the call
        httpClient = TestBed.inject(HttpClient);
        //httpTestingController is useful for making assertions
        httpTestingController = TestBed.inject(HttpTestingController);
    });
   
    it('should call the test URL with get request',()=>{
     let testData: Data = {name:'Rahima web developer'}   
     httpClient.get<Data>(testUrl).subscribe((data)=>{
      expect(data).toEqual(testData);
     });
     const req= httpTestingController.expectOne('/data');
     //if we want to send the mock response to the request we use request.flush() 
     //it will send the data whenever user subscribes to the data
     req.flush(testData);
     //we can do this way also expect
     //expect(req.request.method).toBe('GET');
    });

    it('should call the multiple requests',()=>{

    let testdata:Data[] = [{name:'Rahima'},{name:'Kiran'}];

    httpClient.get<Data>(testUrl).subscribe((data:any)=>{
     expect(data.length).toEqual(0);
     });

     httpClient.get<Data>(testUrl).subscribe((data)=>{
        expect(data).toEqual(testdata[0]);
     });

     httpClient.get<Data>(testUrl).subscribe((data)=>{
        expect(data).toEqual(testdata[1]);
     });

     const req = httpTestingController.match(testUrl);
     expect(req.length).toBe(3);

     req[0].flush([]);
     req[1].flush(testdata[0]);  
     req[2].flush(testdata[1]);
     
    });
});