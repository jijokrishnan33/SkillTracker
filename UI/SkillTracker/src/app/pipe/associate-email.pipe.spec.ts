import { AssociateEmailPipe } from './associate-email.pipe';
import { MockData } from '../mock/mock.data';

describe('AssociateEmailPipe', () => {
  let mockdata=new MockData();
  let mockAssociateDetails= mockdata.mockAssociateDetails;

  let pipe:AssociateEmailPipe;
  beforeEach(() => {
    pipe = new AssociateEmailPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Should give the details corresponding to the input', () => {
    expect(pipe.transform(mockAssociateDetails, 'jijo').length).toBe(3);
  });
  it('Should give full list details if the input text is empty', () => {
    expect(pipe.transform(mockAssociateDetails, '').length).toBe(3);
  });
  it('Should give empty  details if the input list is null', () => {
    expect(pipe.transform(null, 'Jijo').length).toBe(0);
  });
});
