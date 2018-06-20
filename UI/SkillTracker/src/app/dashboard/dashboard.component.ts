import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from "@angular/router";

import { EmployeeService } from '../service/employee.service';
import { AssociateDetails } from '../model/associate-details';
import { GraphContent } from '../model/graph-content';
import { Skill } from '../model/skill'

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
  totalNumberOfEmp: number;
  totalNumOfFemaleEmp: number;
  totalNumOfMaleEmp: number;
  totalNumOfFreshers: number;
  totalNoOfRatedEmp: number;
  totalNoOfMaleRatedEmp: number;
  totalNoOfFemaleRatedEmp: number;
  totalNoOfL1Emp: number;
  totalNoOfL2Emp: number;
  totalNoOfL3Emp: number;

  percOfL1Emp: number;
  percOfL2Emp: number;
  percOfL3Emp: number;
  percOfFemaleEmp: number;
  percOfMaleEmp: number;
  percOfFreshers: number;
  percOfMaleRatedEmp: number;
  percOfFemaleRatedEmp: number;
  skillMap: Map<string, number>;
  skillSummarylist: GraphContent[];
  totalSkillLevel: number;
  constructor(private employeeService: EmployeeService,
    private route: Router,
    private cdRef: ChangeDetectorRef) {

  }

  //ngAfterViewChecked() {
  //  this.cdRef.detectChanges();
  //}
  ngOnInit() {
    this.employeeService.getAllEmployees().subscribe(
      employees => this.employeeList = employees,
      error => {

      },
      () => {
        this.getDashboardValues()
      }
    );

  }

  getDashboardValues() {
    this.totalNumberOfEmp = this.employeeList.length;
    this.skillMap = new Map();
    this.totalSkillLevel = 0;
    this.totalNumOfFemaleEmp = 0;
    this.totalNumOfMaleEmp = 0;
    this.totalNumOfFreshers = 0;
    this.totalNoOfRatedEmp = 0;
    this.totalNoOfMaleRatedEmp = 0;
    this.totalNoOfFemaleRatedEmp = 0;
    this.totalNoOfL1Emp = 0;
    this.totalNoOfL2Emp = 0;
    this.totalNoOfL3Emp = 0;

    this.percOfL1Emp = 0;
    this.percOfL2Emp = 0;
    this.percOfL3Emp = 0;
    this.percOfFemaleEmp = 0;
    this.percOfMaleEmp = 0;
    this.percOfFreshers = 0;
    this.percOfMaleRatedEmp = 0;
    this.percOfFemaleRatedEmp = 0;

    if (this.totalNumberOfEmp > 0) {
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
        employee.skills.sort((a: Skill, b: Skill) => b.skillLevel - a.skillLevel);
        let strongSkillText = "";
        employee.skills.forEach((skill, index) => {
          if (index < 4) {
            strongSkillText = strongSkillText + skill.skillName + ',';
          } else if (index == 4) {
            strongSkillText = strongSkillText + skill.skillName;
          }
          if (this.skillMap.has(skill.skillName)) {
            let skillValue = skill.skillLevel + this.skillMap.get(skill.skillName);
            this.skillMap.set(skill.skillName, skillValue);
          } else {
            this.skillMap.set(skill.skillName, skill.skillLevel);
          }
          this.totalSkillLevel = this.totalSkillLevel + skill.skillLevel;
        }
        );
        employee.strongSkills = strongSkillText;
      });

      this.skillSummarylist = [];
      this.skillMap.forEach((value: number, key: string) => {
        let graphData: GraphContent = new GraphContent();
        graphData.skillName = key;
        graphData.skillPerc = value * 100 / this.totalSkillLevel;
        graphData.colour = this.getRandomColor(this.skillSummarylist.length);
        this.skillSummarylist.push(graphData);
      }
      );

      this.totalNoOfRatedEmp = this.totalNoOfMaleRatedEmp + this.totalNoOfFemaleRatedEmp;
      this.percOfL1Emp = this.round(this.totalNoOfL1Emp / this.totalNumberOfEmp) * 100;
      this.percOfL2Emp = this.round(this.totalNoOfL2Emp / this.totalNumberOfEmp) * 100;
      this.percOfL3Emp = this.round(this.totalNoOfL3Emp / this.totalNumberOfEmp) * 100;

      this.percOfFemaleEmp = this.round(this.totalNumOfFemaleEmp / this.totalNumberOfEmp) * 100;
      this.percOfMaleEmp = this.round(this.totalNumOfMaleEmp / this.totalNumberOfEmp) * 100;
      this.percOfFemaleRatedEmp = this.round(this.totalNoOfFemaleRatedEmp / this.totalNoOfRatedEmp) * 100;
      this.percOfMaleRatedEmp = this.round(this.totalNoOfMaleRatedEmp / this.totalNoOfRatedEmp) * 100;
      this.percOfFreshers = this.round(this.totalNumOfFreshers / this.totalNumberOfEmp) * 100;

      if (this.skillSummarylist == undefined || this.skillSummarylist.length == 0) {
        this.setDumyGraph();
      }
    } else {
      this.setDumyGraph();
    }
  }

  setDumyGraph() {
    this.skillSummarylist = [];
    let graphData: GraphContent = new GraphContent();
    graphData.skillPerc = 100;
    graphData.colour = "lavender";
    this.skillSummarylist.push(graphData);
  }

  delete(employee: AssociateDetails) {
    this.employeeService.deleteEmployee(employee).subscribe(
      response => {
        if (response.message == "Success")
          this.ngOnInit()
      },
      error => ({}),
      () => {
      }
    )
  }

  getRandomColor(length: number) {
    let initialColours: string[] = ['#4fa73391', '#59c4e491', '#e68a00', '#fccdbe', '#33adff', '#b3a3da', '#ff66d9', '#00e6e6', '#a64dff', '#009999'];
    if (length < 10) {
      return initialColours[length];
    } else {
      let letters = 'BCDEF'.split('');
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
      }
      return color;
    }
  }

  round(value: number) {
    return Number(Math.round(+(value + 'e2')) + 'e-2');
  }

}
