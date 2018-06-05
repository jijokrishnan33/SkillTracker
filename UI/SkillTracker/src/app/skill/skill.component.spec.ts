import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from "@angular/router";

import { SkillComponent } from './skill.component';
import { SkillService} from  '../service/skill.service';
import { MockSkillService} from '../mock/mock-skill-service';
import { Skill } from '../model/skill'



describe('SkillComponent', () => {
  let component: SkillComponent;
  let fixture: ComponentFixture<SkillComponent>;
  let routerMock: any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [{ provide: SkillService, useClass: MockSkillService},
      { provide: Router, useValue: routerMock },
      ]
    })
      .compileComponents();


    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new skills', () => {
    component.newskill="Test Skill";
    component.add();
    expect(component.skillList.length).toEqual(3);
  });
  it('should delete skills', () => {
    let skill : Skill= new Skill();
    skill.skillId=238;
    component.delete(skill);
    expect(component.skillList.length).toEqual(1);
  });
  it('should Edit the selected skills', () => {
    let skill : Skill= new Skill();
    skill.skillId=238;
    skill.skillName='Edited Skill';
    component.editedSkill=238;
    component.edit(skill);
    expect(component.skillList.includes(skill));
  });
  it('should Edit the selected skills', () => {
    let skill : Skill= new Skill();
    skill.skillId=238;
    skill.skillName='Edited Skill';
    component.editedSkill=239;
    component.edit(skill);
    expect(component.skillList.includes(skill));
  });
});
