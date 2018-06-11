import { AssociatePhonePipe } from './associate-phone.pipe';
import { MockData } from '../mock/mock.data';

describe('AssociatePhonePipe', () => {
  let mockdata = new MockData();
  let mockAssociateDetails = mockdata.mockAssociateDetails;

  let pipe: AssociatePhonePipe;
  beforeEach(() => {
    pipe = new AssociatePhonePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Should give the details corresponding to the input', () => {
    expect(pipe.transform(mockAssociateDetails, '4564645645').length).toBe(2);
  });
  it('Should give full list details if the input text is empty', () => {
    expect(pipe.transform(mockAssociateDetails, '').length).toBe(3);
  });
  it('Should give empty  details if the input list is null', () => {
    expect(pipe.transform(null, '4564645645').length).toBe(0);
  });
});
