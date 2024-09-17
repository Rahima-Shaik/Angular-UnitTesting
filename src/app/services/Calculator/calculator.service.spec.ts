import { TestBed } from "@angular/core/testing";
import { LoggerService } from "../Logger/logger.service";
import { CalculatorService } from "./calculator.service";

describe('CalculatorService', () => {

  let mockloggerService: any;
  let cal: CalculatorService;

 

  beforeEach(()=>{
    
    mockloggerService = jasmine.createSpyObj('LoggerService',['log']); //alternate way to create Spy

    TestBed.configureTestingModule({
      providers:
      [
        CalculatorService,{
         provide:LoggerService,useValue:mockloggerService,
        }
      ],
    });
   // cal = new CalculatorService(mockloggerService);
     cal = TestBed.inject(CalculatorService)
  });

  it('should add 2 nums', () => {
    let result = cal.add(2, 3);
    expect(result).toBe(5);
    expect(mockloggerService.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract 2 nums', () => {
    let result = cal.subtract(5, 3);
    expect(result).toBe(2);
    expect(mockloggerService.log).toHaveBeenCalledTimes(1);
  });

});
