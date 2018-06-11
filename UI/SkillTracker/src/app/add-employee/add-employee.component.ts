import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ChangeDetectorRef } from '@angular/core';

import { EmployeeService } from '../service/employee.service';
import { AssociateDetails } from '../model/associate-details';
import { SkillService } from '../service/skill.service';
import { Skill } from '../model/skill'

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  selectedFile: File;
  status: string;
  level: string;
  gender: string;
  imageUrl: string = "/assets/images/placeholder_img.png";
  employee: AssociateDetails;
  constructor(private employeeService: EmployeeService,
    private skillService: SkillService,
    private route: Router,
    private cdRef: ChangeDetectorRef) { }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
  ngOnInit() {
    this.employee = new AssociateDetails();
    this.skillService.getAllSkills().subscribe(
      skillls => this.employee.skills = skillls
    );
  }

  addEmployee() {
    this.setStatus();
    this.seleLevel();
    this.seleGender();
    this.employeeService.saveEmployee(this.employee, this.selectedFile).subscribe(
      message => {
        if (message.message == "Success")
          this.route.navigate(["/"])
      }
    );
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
  seleGender() {
    if (this.gender == "1") {
      this.employee.gender = "Male";
    } else {
      this.employee.gender = "Female";
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


}
