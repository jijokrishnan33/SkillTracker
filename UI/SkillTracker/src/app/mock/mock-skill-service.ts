import { Skill } from '../model/skill';
import { ServiceResponse } from '../model/service-response';
import { Observable } from "rxjs/Rx";

export class MockSkillService {

    skillArry: Skill[] = [{ "skillId": 238, "skillName": "HTML" }, { "skillId": 235, "skillName": "CSS" }];
    getAllSkills(): Observable<Skill[]> {
        return Observable.of(this.skillArry);
    }
    save(skill: Skill): Observable<ServiceResponse> {
        this.skillArry.push(skill);
        return  Observable.of(new ServiceResponse("Success"));
    }

    delete(skill: Skill): Observable<ServiceResponse> {
        var index = this.skillArry.indexOf(skill);
        this.skillArry.splice(index, 1); 
        return  Observable.of(new ServiceResponse("Success"));
    }
}
