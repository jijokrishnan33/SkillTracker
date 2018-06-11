import { Skill } from '../model/skill';
import { ServiceResponse } from '../model/service-response';
import { Observable } from "rxjs/Rx";
import { MockData} from './mock.data';

export class MockSkillService {

    mockdata=new MockData();
    mockSkillArray= this.mockdata.mockSkillArry;
    getAllSkills(): Observable<Skill[]> {
        return Observable.of(this.mockSkillArray);
    }
    save(skill: Skill): Observable<ServiceResponse> {
        this.mockSkillArray.push(skill);
        return  Observable.of(new ServiceResponse("Success"));
    }

    delete(skill: Skill): Observable<ServiceResponse> {
        var index = this.mockSkillArray.indexOf(skill);
        this.mockSkillArray.splice(index, 1); 
        return  Observable.of(new ServiceResponse("Success"));
    }
}
