import { AssociateIdPipe } from './associate-id.pipe';
import { MockData } from '../mock/mock.data';

describe('AssociateIdPipe', () => {

  let mockdata = new MockData();
  let mockAssociateDetails = mockdata.mockAssociateDetails;

  let pipe: AssociateIdPipe;
  beforeEach(() => {
    pipe = new AssociateIdPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Should give the details corresponding to the input', () => {
    expect(pipe.transform(mockAssociateDetails, '16516').length).toBe(1);
  });
  it('Should give full list details if the input text is empty', () => {
    expect(pipe.transform(mockAssociateDetails, '').length).toBe(3);
  });
  it('Should give empty  details if the input list is null', () => {
    expect(pipe.transform(null, '16516').length).toBe(0);
  });

});
