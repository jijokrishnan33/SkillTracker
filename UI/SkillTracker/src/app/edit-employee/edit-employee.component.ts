import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { EmployeeService } from '../service/employee.service';
import { SkillService } from '../service/skill.service';
import { AssociateDetails } from '../model/associate-details';
import { ServiceResponse } from '../model/service-response';
import { Skill } from '../model/skill';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  selectedFile: File;
  employee: AssociateDetails = new AssociateDetails();
  imageUrl: string;
  status: string;
  level: string;
  gender: string;
  searchText: string;
  maleEmployee: boolean = false;
  newSkillList: Skill[] = [];
  skillList: Skill[];
  selectedSkill: Skill;
  viewOnly: boolean = false;

  constructor(private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private rte: Router,
    private skillService: SkillService,
    private cdRef: ChangeDetectorRef) { }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    let path = this.route.snapshot.url[0].path;
    if (path.includes("view")) {
      this.viewOnly = true;
    }
    this.employeeService.getEmployeeById(id).subscribe(
      employee => {
        this.employee = employee;
        if (this.employee.gender == "Male") {
          this.maleEmployee = true;
        }
        this.imageUrl = "data:image/png;base64," + this.employee.pic;
        this.setSkills();
      }
    );
  }

  setSkills() {
    this.skillService.getAllSkills().subscribe(
      skills => {
        this.skillList = skills;
        this.skillList.forEach(skill => {
          let newSkill: boolean = true;
          this.employee.skills.forEach(existingSkill => {
            if (existingSkill.skillId == skill.skillId) {
              newSkill = false;
            }
          })
          if (newSkill) {
            this.newSkillList.push(skill);
          }
        }
        )
      }
    )


  }
  updateEmployee() {
    this.setStatus();
    this.seleLevel();
    this.setImage();
    this.seleGender();
    this.employeeService.saveEmployee(this.employee, this.selectedFile).subscribe(
      message => {
        if (message.message == "Success")
          this.rte.navigate(["/"])
      }
    );
  }

  seleGender() {
    if (this.gender == "1") {
      this.employee.gender = "Male";
    } else {
      this.employee.gender = "Female";
    }
  }

  setImage() {
    if (this.selectedFile == undefined) {
      let arr = this.imageUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      this.selectedFile = new File([u8arr], "Filename.png", { type: mime });
    }
  }

  setStatus() {
    if (this.status == "1") {
      this.employee.statusGreen = true;
    } else if (this.status == "2") {
      this.employee.statusBlue = true;
    } else if (this.status == "3") {
      this.employee.statusRed = true;
    }
  }
  seleLevel() {
    if (this.level == "1") {
      this.employee.level1 = true;
    } else if (this.level == "2") {
      this.employee.level2 = true;
    } else if (this.level == "3") {
      this.employee.level3 = true;
    }
  }

  handleFileInput(file: FileList) {
    this.selectedFile = file[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }

  }

  sliderChnage(value: any, skill: Skill) {
    skill.skillLevel = value;
  }

  addSkill() {
    this.employee.skills.push(this.selectedSkill);
    this.newSkillList = [];
    this.setSkills();
  }

  onSelect(selectedSkilID: number) {
    for (var i = 0; i < this.newSkillList.length; i++) {
      if (this.newSkillList[i].skillId == selectedSkilID) {
        this.selectedSkill = this.newSkillList[i];
      }
    }
  }

}
