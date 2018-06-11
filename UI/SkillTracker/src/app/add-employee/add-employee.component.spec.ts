import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from "@angular/router";

import { AddEmployeeComponent } from './add-employee.component';
import { SkillService } from '../service/skill.service';
import { MockSkillService } from '../mock/mock-skill-service';
import { Skill } from '../model/skill';
import { EmployeeService } from '../service/employee.service';
import { AssociateDetails } from '../model/associate-details';
import { MockEmployeeService } from '../mock/mock-employee-service';

describe('AddEmployeeComponent', () => {
  let component: AddEmployeeComponent;
  let fixture: ComponentFixture<AddEmployeeComponent>;
  let routerMock: any;

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
    fixture = TestBed.createComponent(AddEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create employee data based on inputted values. Condition 1', () => {
    component.level="1";
    component.status="1";
    component.gender="1";
    component.addEmployee();
    expect(component.employee.gender).toEqual("Male");
    expect(component.employee.level1).toEqual(true);
    expect(component.employee.statusGreen).toEqual(true);
  });

  it('should create employee data based on inputted values. Condition 2', () => {
    component.level="2";
    component.status="2";
    component.addEmployee();
    expect(component.employee.level2).toEqual(true);
    expect(component.employee.statusBlue).toEqual(true);
  });

  it('should create employee data based on inputted values. Condition 3', () => {
    component.level="3";
    component.status="3";
    component.gender="2";
    component.addEmployee();
    expect(component.employee.gender).toEqual("Female");
    expect(component.employee.level3).toEqual(true);
    expect(component.employee.statusRed).toEqual(true);
  });

  it('should should check handle file input functionality', () => {
    let mockFile = {file:[{"name":"file.bin", "size":1018, "type":"application/binary", "length":0}]}
   // need Work
  });

  it('should should check handling of slider changes', () => {
    let skill : Skill= new Skill();
    component.sliderChnage(10,skill);
    expect(skill.skillLevel).toEqual(10);
  });
});
