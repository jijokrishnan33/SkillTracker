import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, ParamMap, Data } from "@angular/router";

import { EditEmployeeComponent } from './edit-employee.component';
import { SkillService } from '../service/skill.service';
import { MockSkillService } from '../mock/mock-skill-service';
import { Skill } from '../model/skill';
import { EmployeeService } from '../service/employee.service';
import { AssociateDetails } from '../model/associate-details';
import { MockEmployeeService } from '../mock/mock-employee-service';

describe('EditEmployeeComponent', () => {
  let component: EditEmployeeComponent;
  let fixture: ComponentFixture<EditEmployeeComponent>;
  let paramMap: MockParamMap;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [{ provide: SkillService, useClass: MockSkillService },
      { provide: EmployeeService, useClass: MockEmployeeService },
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
              paramMap: new MockParamMap(),
              url : 
              [
                {
                  path: 'start'
                }
              ]
          }
        }
      }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should Update employee data based on inputted values. Condition 1', () => {
    component.level="1";
    component.status="1";
    component.gender="1";
    component.updateEmployee();
    expect(component.employee.gender).toEqual("Male");
    expect(component.employee.level1).toEqual(true);
    expect(component.employee.statusGreen).toEqual(true);
  });
  it('should Update employee data based on inputted values. Condition 2', () => {
    component.level="2";
    component.status="2";
    component.updateEmployee();
    expect(component.employee.level2).toEqual(true);
    expect(component.employee.statusBlue).toEqual(true);
  });

  it('should Update employee data based on inputted values. Condition 3', () => {
    component.level="3";
    component.status="3";
    component.gender="2";
    component.updateEmployee();
    expect(component.employee.gender).toEqual("Female");
    expect(component.employee.level3).toEqual(true);
    expect(component.employee.statusRed).toEqual(true);
  });



  it('should check handling of slider changes', () => {
    let skill : Skill= new Skill();
    component.sliderChnage(10,skill);
    expect(skill.skillLevel).toEqual(10);
  });

  it('should check Add skill function', () => {
    let skill : Skill= new Skill();
    skill.skillId=102;
    skill.skillLevel=11;
    skill.skillName="Added Skill";
    component.selectedSkill=skill;
    component.addSkill();
    expect(component.employee.skills.length).toEqual(2);
  });

  it('should check Check the dropdown select function of skills', () => {
    component.onSelect(235);
    expect(component.selectedSkill.skillId).toEqual(235);
  });
  class MockParamMap {
    get(id: string) {
      return 239;
    }
  }
});
