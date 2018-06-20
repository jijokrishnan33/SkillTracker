import { AssociateSkillPipe } from './associate-skill.pipe';
import { MockData} from '../mock/mock.data';

describe('AssociateSkillPipe', () => {
  let mockdata = new MockData();
  let mockAssociateDetails = mockdata.mockAssociateDetails;

  let pipe: AssociateSkillPipe;
  beforeEach(() => {
    pipe = new AssociateSkillPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Should give the details corresponding to the input', () => {
    expect(pipe.transform(mockAssociateDetails, 'Boot').length).toBe(1);
  });
  it('Should give full list details if the input text is empty', () => {
    expect(pipe.transform(mockAssociateDetails, '').length).toBe(3);
  });
  it('Should give empty  details if the input list is null', () => {
    expect(pipe.transform(null, 'boot').length).toBe(0);
  });
});
