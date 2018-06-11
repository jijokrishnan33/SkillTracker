import { AssociateNamePipe } from './associate-name.pipe';
import { MockData} from '../mock/mock.data';

describe('AssociateNamePipe', () => {

  let mockdata=new MockData();
  let mockAssociateDetails= mockdata.mockAssociateDetails;

  let pipe:AssociateNamePipe;
  beforeEach(() => {
    pipe = new AssociateNamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Should give the details corresponding to the input', () => {
    expect(pipe.transform(mockAssociateDetails, 'jijo').length).toBe(1);
  });
  it('Should give full list details if the input text is empty', () => {
    expect(pipe.transform(mockAssociateDetails, '').length).toBe(3);
  });
  it('Should give empty  details if the input list is null', () => {
    expect(pipe.transform(null, 'Jijo').length).toBe(0);
  });
});
