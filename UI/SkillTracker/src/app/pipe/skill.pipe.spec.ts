import { SkillPipe } from './skill.pipe';
import { MockData } from '../mock/mock.data';

describe('SkillPipe', () => {
  let mockdata = new MockData();
  let mockSkillData = mockdata.mockSkillArry;

  let pipe: SkillPipe;
  beforeEach(() => {
    pipe = new SkillPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Should give the details corresponding to the input', () => {
    expect(pipe.transform(mockSkillData, 'HTML').length).toBe(1);
  });
  it('Should give full list details if the input text is empty', () => {
    expect(pipe.transform(mockSkillData, '').length).toBe(2);
  });
  it('Should give empty  details if the input list is null', () => {
    expect(pipe.transform(null, 'HTML').length).toBe(0);
  });
});
