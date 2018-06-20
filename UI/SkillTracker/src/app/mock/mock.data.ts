import { AssociateDetails } from '../model/associate-details';
import { Skill } from '../model/skill';

export class MockData {

    public mockAssociateDetails: AssociateDetails[] = [
        { "associateId": 16516, "name": "jijo", "email": "jijokrishnan@gmail.com", "mobile": "4564645645", "gender": "Male", "pic": "", "statusGreen": false, "statusBlue": true, "statusRed": false, "level1": false, "level2": true, "level3": false, "remark": "asda", "spokenLevel": 9, "communicactionLevel": 10, "logicLevel": 8, "aptitudeLevel": 18, "confidenceLevel": 10, "strength": "asda", "weakness": "sdasd", "skills": [{ "skillId": 238, "skillName": "HTML", "skillLevel": 10 }],"strongSkills": "" },
        { "associateId": 16517, "name": "jani", "email": "jijokrishnan@gmail.com", "mobile": "4564645645", "gender": "Female", "pic": "", "statusGreen": true, "statusBlue": false, "statusRed": false, "level1": true, "level2": false, "level3": false, "remark": "asda", "spokenLevel": 9, "communicactionLevel": 10, "logicLevel": 8, "aptitudeLevel": 18, "confidenceLevel": 10, "strength": "asda", "weakness": "sdasd", "skills": [{ "skillId": 238, "skillName": "HTML", "skillLevel": 10 }],"strongSkills": "" },
        { "associateId": 16518, "name": "Juni", "email": "jijokrishnan@gmail.com", "mobile": "4564645644", "gender": "Female", "pic": "", "statusGreen": false, "statusBlue": false, "statusRed": true, "level1": false, "level2": false, "level3": true, "remark": "asda", "spokenLevel": 9, "communicactionLevel": 10, "logicLevel": 8, "aptitudeLevel": 18, "confidenceLevel": 10, "strength": "asda", "weakness": "sdasd", "skills": [{ "skillId": 238, "skillName": "HTML", "skillLevel": 10 }],"strongSkills": "Jenkins,Spring boot,Bootstrap,Spring,Angular 2" },
    ];

    public mockSkillArry: Skill[] = [
        { "skillId": 238, "skillName": "HTML", "skillLevel": 10 },
        { "skillId": 235, "skillName": "CSS", "skillLevel": 10 }
    ];
}
