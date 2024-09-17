import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
    let service: LoggerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
         providers:[LoggerService],
        });

        service = TestBed.inject(LoggerService);

        //arrange
       // service = new LoggerService();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('Should not have any messages at start', () => {
        //act
        let count = service.messages.length;
        //assert
        expect(count).toBe(0);
    });

    it('Should push the messages when log is called', () => {
        service.log('message');
        expect(service.messages.length).toBe(1);
    });

    it('should clear the messages when clear is called', () => {
        service.clear();
        expect(service.messages.length).toBe(0);
    });
});
