import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from "@angular/router";

import { EmployeeService } from '../service/employee.service';
import { AssociateDetails } from '../model/associate-details';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  imageUrl: string = "/assets/images/placeholder_img.png";
  data: string = "";
  nameText: string = "";
  idText: string = "";
  mailTest: string = "";
  mobileText: string = "";
  strongSkillText: string = "";


  imgData = 'data:image/png;base64,' + this.data;
  status: string = "green";
  employeeList: AssociateDetails[];
  totalNumberOfEmp: number = 0;
  totalNumOfFemaleEmp: number = 0;
  totalNumOfMaleEmp: number = 0;
  totalNumOfFreshers: number = 0;
  totalNoOfRatedEmp: number = 0;
  totalNoOfMaleRatedEmp: number = 0;
  totalNoOfFemaleRatedEmp: number = 0;
  totalNoOfL1Emp: number = 0;
  totalNoOfL2Emp: number = 0;
  totalNoOfL3Emp: number = 0;

  percOfL1Emp: number = 0;
  percOfL2Emp: number = 0;
  percOfL3Emp: number = 0;
  percOfFemaleEmp: number = 0;
  percOfMaleEmp: number = 0;
  percOfFreshers: number = 0;
  percOfMaleRatedEmp: number = 0;
  percOfFemaleRatedEmp: number = 0;
  skillMap: Map<string, number> = new Map();
  constructor(private employeeService: EmployeeService,
    private route: Router,
    private cdRef: ChangeDetectorRef) { }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
  ngOnInit() {
    this.employeeService.getAllEmployees().subscribe(
      employees => this.employeeList = employees,
      error => {

      },
      () => {
        this.getDashboardValues();
      }
    );
  }

  getDashboardValues() {
    this.totalNumberOfEmp = this.employeeList.length;
    this.employeeList.forEach(employee => {

      if (employee.level1) {
        this.totalNoOfL1Emp++;
        this.totalNumOfFreshers++;
      } else if (employee.level2) {
        this.totalNoOfL2Emp++;
        if (employee.gender == "Male") {
          this.totalNoOfMaleRatedEmp++
        } else {
          this.totalNoOfFemaleRatedEmp++;
        }
      } else {
        this.totalNoOfL3Emp++;
        if (employee.gender == "Male") {
          this.totalNoOfMaleRatedEmp++
        } else {
          this.totalNoOfFemaleRatedEmp++;
        }
      }

      if (employee.gender == "Male") {
        this.totalNumOfMaleEmp++;
      } else {
        this.totalNumOfFemaleEmp++;
      }
      employee.skills.forEach(skill => {
        if (this.skillMap.has(skill.skillName)) {
          let skillValue = skill.skillLevel + this.skillMap.get(skill.skillName);
          this.skillMap.set(skill.skillName, skillValue);
        } else {
          this.skillMap.set(skill.skillName, skill.skillLevel);
        }
      }

      );
    });
    this.totalNoOfRatedEmp = this.totalNoOfMaleRatedEmp + this.totalNoOfFemaleRatedEmp;
    this.percOfL1Emp = Math.round(this.totalNoOfL1Emp / this.totalNumberOfEmp);
    this.percOfL2Emp = Math.round(this.totalNoOfL2Emp / this.totalNumberOfEmp);
    this.percOfL3Emp = Math.round(this.totalNoOfL3Emp / this.totalNumberOfEmp);

    this.percOfFemaleEmp = Math.round(this.totalNumOfFemaleEmp / this.totalNumberOfEmp);
    this.percOfMaleEmp = Math.round(this.totalNumOfMaleEmp / this.totalNumberOfEmp);
    this.percOfFemaleRatedEmp = Math.round(this.totalNoOfFemaleRatedEmp / this.totalNoOfRatedEmp);
    this.percOfMaleRatedEmp = Math.round(this.totalNoOfMaleRatedEmp / this.totalNoOfRatedEmp);
    this.percOfFreshers = Math.round(this.totalNumOfFreshers / this.totalNumberOfEmp);
  }

  delete(employee: AssociateDetails) {
    this.employeeService.deleteEmployee(employee).subscribe(
      response => {
        if (response.message == "Success")
          this.ngOnInit()
      },
      error => ({}),
      () => {
        this.route.navigate(["/"])
      }
    )
  }

}
