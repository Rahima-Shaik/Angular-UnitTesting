import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  let pipe:StrengthPipe;
  beforeEach(()=>{
  pipe=new StrengthPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('Should display weak if 5 value is passed',()=>{
    expect(pipe.transform(5)).toEqual('5(weak)');
  });
  it('Should display strong if 15 value is passed',()=>{
    expect(pipe.transform(15)).toEqual('15(strong)');
  });
  it('Should display strongest if 25 value is passed',()=>{
    expect(pipe.transform(25)).toEqual('25(strongest)');
  });
});
