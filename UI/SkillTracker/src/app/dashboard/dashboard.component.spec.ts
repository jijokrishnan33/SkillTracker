import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardComponent } from './dashboard.component';
import { SkillService } from '../service/skill.service';
import { MockSkillService } from '../mock/mock-skill-service';
import { Skill } from '../model/skill';
import { EmployeeService } from '../service/employee.service';
import { AssociateDetails } from '../model/associate-details';
import { MockEmployeeService } from '../mock/mock-employee-service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [{ provide: SkillService, useClass: MockSkillService },
      { provide: EmployeeService, useClass: MockEmployeeService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create dashboard', () => {
    expect(component).toBeTruthy();
  });
  it('should delete employee', () => {
    let employee: AssociateDetails = {"associateId":16516,"name":"sdas","email":"jijokrishnan33@gmail.com","mobile":"4564645645","gender":"Male","pic":"","statusGreen":false,"statusBlue":true,"statusRed":false,"level1":false,"level2":true,"level3":false,"remark":"asda","spokenLevel":9,"communicactionLevel":10,"logicLevel":8,"aptitudeLevel":18,"confidenceLevel":10,"strength":"asda","weakness":"sdasd","skills":[{ "skillId": 238, "skillName": "HTML" ,"skillLevel":10}]};
    component.delete(employee);
    expect(component).toBeTruthy();
  });
});
