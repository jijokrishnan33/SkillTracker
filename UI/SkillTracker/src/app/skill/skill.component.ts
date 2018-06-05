import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';

import { Skill } from '../model/skill';
import { SkillService } from '../service/skill.service';


@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  editedSkill: number;
  newskill: string = '';
  skillList: Skill[];
  title = "Add Skill";
  searchText='';
  constructor(private route: Router, private skillService: SkillService) { }

  ngOnInit() {
    this.getAllSkills();
  }

  getAllSkills() {
    this.skillService.getAllSkills().subscribe(
      skillls =>this.skillList=skillls
    );
  }

  edit(skill: Skill) {
    if (skill.skillId == this.editedSkill) {
      this.skillService.save(skill).subscribe(
        response => this.getAllSkills()
      );
      this.editedSkill = 0.00;
    } else {
      this.editedSkill = skill.skillId;
    }
  }
  delete(skill: Skill) {
    this.skillService.delete(skill).subscribe(
      response => this.getAllSkills()
    );
  }

  add() {
    if(this.newskill != '') {
    let skill : Skill = new Skill();
    skill.skillName=this.newskill;
    this.skillService.save(skill).subscribe(
      response => this.getAllSkills()
    );
    this.newskill = '';
    }
  }




}
